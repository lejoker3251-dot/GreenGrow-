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
  page.on('pageerror', error => pageErrors.push(error.message));

  // Force the external Three.js module to fail, exercising the existing fallback path.
  await page.route('https://cdn.jsdelivr.net/**', route => route.abort());
  await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle' });

  const fallback = page.locator('[data-botanical-scene] .botanical-fallback');
  await fallback.waitFor({ state: 'visible' });
  assert.equal(await fallback.evaluate(element => getComputedStyle(element).opacity), '1',
    'fallback remains fully visible when the 3D module cannot load');

  const before = await fallback.boundingBox();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForFunction(() => {
    const image = document.querySelector('[data-botanical-scene] .botanical-fallback');
    return image && image.getBoundingClientRect().width > 0;
  });
  const after = await fallback.boundingBox();
  assert.ok(before?.width > 0 && after?.width > 0, 'fallback remains laid out at desktop and mobile viewport sizes');
  assert.ok(after.width < before.width, 'fallback responds to the narrower mobile viewport');
  assert.deepEqual(pageErrors, [], 'fallback path and viewport resize produce no uncaught page errors');

  console.log('Botanical hero browser checks passed (5 assertions).');
} finally {
  await browser?.close();
  server.kill('SIGTERM');
}
