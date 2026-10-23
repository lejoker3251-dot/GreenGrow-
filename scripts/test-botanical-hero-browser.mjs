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
  page.on('pageerror', error => pageErrors.push(error.message));
  page.on('request', request => {
    if (request.url().includes('three.module.js')) threeRequests.push(request.url());
  });

  // Reduced-motion users should keep the static illustration without loading Three.js.
  await page.route('https://cdn.jsdelivr.net/**', route => route.abort());
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

  // The mobile navigation must expose its state and close predictably with Escape.
  const menuButton = page.locator('.menu-toggle');
  await menuButton.click();
  assert.equal(await menuButton.getAttribute('aria-expanded'), 'true', 'mobile menu announces its open state');
  await page.keyboard.press('Escape');
  assert.equal(await menuButton.getAttribute('aria-expanded'), 'false', 'Escape closes the mobile menu');
  assert.equal(await page.evaluate(() => document.activeElement?.classList.contains('menu-toggle')), true,
    'closing with Escape returns keyboard focus to the menu button');

  assert.deepEqual(pageErrors, [], 'fallback, responsive layout, and menu interaction produce no uncaught page errors');

  console.log('Browser checks passed (8 assertions: reduced motion, fallback, responsive layout, and keyboard navigation).');
} finally {
  await browser?.close();
  server.kill('SIGTERM');
}
