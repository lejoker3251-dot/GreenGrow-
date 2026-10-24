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

  // Reduced-motion users should keep the static illustration without loading Three.js.
  await page.route('https://cdn.jsdelivr.net/**', route => route.abort());
  // Corrupt local data must not break page startup or the visible list counter.
  await page.addInitScript(() => localStorage.setItem('greengrow-list', '{invalid-json'));
  await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle' });

  const fallback = page.locator('[data-botanical-scene] .botanical-fallback');
  await fallback.waitFor({ state: 'visible' });
  assert.equal(await fallback.evaluate(element => getComputedStyle(element).opacity), '1',
    'fallback remains fully visible when reduced motion is enabled');
  assert.deepEqual(threeRequests, [], 'reduced-motion preference skips the external Three.js module');

  const before = await fallback.boundingBox();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForFunction(() => {
    const image = document.querySelector('[data-botanical-scene] .botanical-fallback');
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

  assert.deepEqual(pageErrors, [], 'fallback, responsive layout, and menu interaction produce no uncaught page errors');

  console.log(`Browser checks passed: responsive widths, accessibility, storage resilience, navigation, and resource smoke audit (${resourceAudit.resourceCount} resources, ${resourceAudit.images.length} images).`);
} finally {
  await browser?.close();
  server.kill('SIGTERM');
}
