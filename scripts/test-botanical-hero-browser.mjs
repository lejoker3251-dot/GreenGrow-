import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import { chromium } from 'playwright';

const port = 4179;
const server = spawn(process.execPath, ['node_modules/astro/astro.js', 'preview', '--host', '127.0.0.1', '--port', String(port)], {
  stdio: 'ignore',
  env: { ...process.env, HOST: '127.0.0.1', PORT: String(port) },
});
let browser;

try {
  let ready = false;
  for (let attempt = 0; attempt < 60; attempt++) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/`);
      if (response.ok) { ready = true; break; }
    } catch {}
    await delay(500);
  }
  assert.ok(ready, 'Astro preview server starts for browser tests');

  browser = await chromium.launch({ headless: true, args: ['--disable-dev-shm-usage'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
  const pageErrors = [];
  const threeRequests = [];
  const failedLocalRequests = [];
  const badLocalResponses = [];
  const localOrigin = `http://127.0.0.1:${port}`;
  page.on('pageerror', error => pageErrors.push(error.message));
  page.on('request', request => {
    if (request.url().includes('three.module.js')) threeRequests.push(request.url());
  });
  page.on('requestfailed', request => {
    if (request.url().startsWith(localOrigin)) {
      failedLocalRequests.push(`${request.method()} ${request.url()}: ${request.failure()?.errorText ?? 'unknown failure'}`);
    }
  });
  page.on('response', response => {
    if (response.url().startsWith(localOrigin) && response.status() >= 400) {
      badLocalResponses.push(`${response.status()} ${response.url()}`);
    }
  });

  // The current Botanical Luxury hero uses a full-bleed static photograph. Reduced-motion
  // users must still see it, and the homepage must not load the legacy Three.js scene.
  await page.route('https://cdn.jsdelivr.net/**', route => route.abort());
  // Corrupt local data must not break page startup or the visible list counter.
  await page.addInitScript(() => localStorage.setItem('greengrow-list', '{invalid-json'));
  await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle' });

  const fallback = page.locator('#hero-art img');
  await fallback.waitFor({ state: 'visible' });
  assert.ok(await fallback.evaluate(element => element.getBoundingClientRect().width > 0),
    'static hero photograph remains visible when reduced motion is enabled');
  assert.equal(await fallback.evaluate(element => getComputedStyle(element).objectFit), 'cover',
    'hero photograph fills its frame without distorting the image');
  assert.deepEqual(threeRequests, [], 'static hero does not load the legacy Three.js module');

  const before = await fallback.boundingBox();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForFunction(() => {
    const image = document.querySelector('#hero-art img');
    return image && image.getBoundingClientRect().width > 0;
  });
  const after = await fallback.boundingBox();
  assert.ok(before?.width > 0 && after?.width > 0, 'fallback remains laid out at desktop and mobile viewport sizes');
  assert.ok(after.width < before.width, 'fallback responds to the narrower mobile viewport');

  // Sweep common narrow, tablet, and desktop widths to catch scene overflow.
  for (const width of [320, 360, 390, 768, 1280]) {
    await page.setViewportSize({ width, height: 844 });
    const bounds = await fallback.boundingBox();
    assert.ok(bounds && bounds.width > 0, `fallback stays visible at ${width}px viewport width`);
    assert.ok(bounds.x >= 0 && bounds.x + bounds.width <= width + 1,
      `fallback stays within the viewport at ${width}px width`);
  }
  assert.equal(await page.locator('main#main-content').count(), 1, 'page exposes one main landmark');
  assert.equal(await page.locator('nav[aria-label="Hauptnavigation"]').count(), 1,
    'primary navigation has an accessible name');
  assert.equal(await page.locator('a.skip-link[href="#main-content"]').count(), 1,
    'keyboard users have a skip-to-content link');

  // The age dialog should be labelled, modal, and keep keyboard focus inside.
  const ageGate = page.locator('#age-gate');
  if (await ageGate.isVisible()) {
    assert.equal(await ageGate.getAttribute('aria-modal'), 'true', 'age dialog announces modal behavior');
    assert.equal(await ageGate.getAttribute('aria-labelledby'), 'age-gate-title', 'age dialog has an accessible title');
    const yesButton = page.locator('#age-gate-yes');
    const noButton = page.locator('#age-gate-no');
    await page.waitForFunction(() => document.activeElement?.id === 'age-gate-yes');
    await page.keyboard.press('Shift+Tab');
    assert.equal(await page.evaluate(() => document.activeElement?.id), 'age-gate-no',
      'Shift+Tab wraps focus to the last age-dialog control');
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => document.activeElement?.id), 'age-gate-yes',
      'Tab wraps focus to the first age-dialog control');
    await yesButton.click();
    await page.waitForFunction(() => !document.documentElement.classList.contains('age-gate-active'));
  }
  assert.equal(await page.locator('#cart-count').textContent(), '0',
    'invalid localStorage JSON does not break the page or list counter');

  // Basic performance/resource smoke checks: trigger lazy assets and catch broken local files.
  await page.evaluate(async () => {
    const step = Math.max(300, Math.floor(window.innerHeight * 0.8));
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise(resolve => requestAnimationFrame(resolve));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState('networkidle');
  const resourceAudit = await page.evaluate(() => ({
    readyState: document.readyState,
    resourceCount: performance.getEntriesByType('resource').length,
    images: Array.from(document.images).map(image => ({
      src: image.currentSrc || image.src,
      complete: image.complete,
      naturalWidth: image.naturalWidth,
      loading: image.loading,
    })),
  }));
  assert.equal(resourceAudit.readyState, 'complete', 'document finishes loading');
  assert.ok(resourceAudit.resourceCount > 0, 'browser records resource timing entries');
  const brokenImages = resourceAudit.images.filter(image => image.complete && image.naturalWidth === 0);
  assert.deepEqual(brokenImages, [], 'completed image requests have valid image data');
  assert.deepEqual(failedLocalRequests, [], 'no same-origin requests fail');
  assert.deepEqual(badLocalResponses, [], 'no same-origin resource returns an HTTP error');

  // The mobile navigation must expose its state and close predictably with Escape.
  const menuButton = page.locator('.menu-toggle');
  await menuButton.click();
  assert.equal(await menuButton.getAttribute('aria-expanded'), 'true', 'mobile menu announces its open state');
  await page.keyboard.press('Escape');
  assert.equal(await menuButton.getAttribute('aria-expanded'), 'false', 'Escape closes the mobile menu');
  assert.equal(await page.evaluate(() => document.activeElement?.classList.contains('menu-toggle')), true,
    'closing with Escape returns keyboard focus to the menu button');

  // Unknown product URLs should use the branded not-found page instead of a blank or misleading product view.
  const missingPageResponse = await page.goto(`${localOrigin}/product/does-not-exist/`, { waitUntil: 'networkidle' });
  assert.equal(missingPageResponse?.status(), 404, 'unknown product URL returns HTTP 404');
  await page.locator('h1#not-found-title').waitFor();
  assert.equal(await page.locator('main#main-content a[href="/shop/"]').count(), 1,
    'not-found page provides a direct route back to the shop');

  // Product imagery uses the image path stored with each catalog entry, while
  // clearly stating that the archived image has not been individually verified for the strain.
  await page.goto(`${localOrigin}/product/seed-0001/`, { waitUntil: 'networkidle' });
  const detailImage = page.locator('.seed-detail-image img');
  assert.match(await detailImage.getAttribute('src') || '', /White%201\.png\.JPG|White 1\.png\.JPG/i,
    'product detail uses the archived White 1 image');
  assert.match(await detailImage.getAttribute('alt') || '', /Bildarchiv/i,
    'product detail image is described as coming from the image archive');
  assert.match(await page.locator('.image-caption').textContent() || '', /noch nicht verifiziert/i,
    'product detail discloses that image-to-strain assignment is not verified');

  // Catalog filters should be keyboard-operable and update the result list.
  await page.goto(`${localOrigin}/shop/`, { waitUntil: 'networkidle' });
  // Shop editorial copy and the two requested rubrics should be present without implying verified product assignments.
  await page.locator('#cali-editorial-title').waitFor();
  assert.equal(await page.locator('.cali-editorial-card').count(), 4,
    'shop presents all four reviewed editorial text blocks');
  for (const heading of ['California Genetics', 'Original Cali', 'Premium-Qualität, fairer Preis', 'Für Einsteiger']) {
    assert.equal(await page.getByRole('heading', { name: heading }).count(), 1,
      `shop includes the ${heading} editorial heading`);
  }
  assert.equal(await page.getByRole('heading', { name: 'Outdoor', exact: true }).count(), 1,
    'Outdoor shop rubric is visible');
  assert.equal(await page.getByRole('heading', { name: 'Für Anfänger', exact: true }).count(), 1,
    'beginner shop rubric is visible');
  assert.equal(await page.locator('.category-entry-card .rubric-status').count(), 2,
    'both new rubrics clearly indicate that product selection is still being prepared');
  assert.equal(await page.locator('.category-entry-card a[href="#sortiment"]').count(), 2,
    'both rubrics link to the existing catalog without pretending to filter unverified products');

  const categoryFilter = page.locator('.filter-row button[data-filter="Autoflowering"]');
  await categoryFilter.focus();
  await page.keyboard.press('Enter');
  assert.equal(await categoryFilter.getAttribute('aria-pressed'), 'true',
    'category filter supports keyboard activation and exposes its selected state');
  assert.ok(await page.locator('.product-card:not([hidden])').count() > 0,
    'keyboard-activated category filter leaves matching products visible');
  const searchInput = page.locator('#product-search');
  await searchInput.fill('seed-phrase-that-should-not-exist');
  assert.equal(await page.locator('.product-card:not([hidden])').count(), 0,
    'catalog search can filter to an empty result set');
  assert.equal(await page.locator('#no-results').isVisible(), true,
    'empty search results are announced with a visible empty state');

  assert.deepEqual(pageErrors, [], 'fallback, responsive layout, navigation, product detail, catalog filters, and search produce no uncaught page errors');

  console.log(`Browser checks passed: responsive widths, accessibility, storage resilience, navigation, and resource smoke audit (${resourceAudit.resourceCount} resources, ${resourceAudit.images.length} images).`);
} finally {
  await browser?.close();
  server.kill('SIGTERM');
}
