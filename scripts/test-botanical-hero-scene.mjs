import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

const source = await readFile(new URL('../src/components/BotanicalHeroScene.astro', import.meta.url), 'utf8');

assert.match(source, /const cleanup = \(\) =>/u, 'scene has one centralized cleanup function');
assert.match(source, /resizeObserver\?\.disconnect\(\)/u, 'cleanup disconnects ResizeObserver');
assert.match(source, /intersectionObserver\?\.disconnect\(\)/u, 'cleanup disconnects IntersectionObserver');
assert.match(source, /removeEventListener\(type, listener, options\)/u, 'cleanup removes registered listeners');
assert.match(source, /geometries\.forEach\(\(geometry\) => geometry\.dispose\?\.\(\)\)/u, 'cleanup disposes unique geometries');
assert.match(source, /materials\.forEach\(\(material\) => material\.dispose\?\.\(\)\)/u, 'cleanup disposes unique materials');
assert.match(source, /renderer\?\.dispose\?\.\(\)/u, 'cleanup disposes renderer');
assert.match(source, /catch \(error\) \{\s*cleanup\(\)/u, 'startup failures clean up partial initialization');
assert.match(source, /scrollProgress = reducedMotion \? 1 : 0/u, 'reduced-motion scene starts in fully revealed static state');
assert.match(source, /const meshMaterial = trackRoot \? material\.clone\(\) : material/u, 'each animated root gets an independent material');
assert.match(source, /new ResizeObserver\(resize\)/u, 'scene responds to container resizing');
assert.match(source, /renderer\.setSize\(width, height, false\)/u, 'resize updates renderer dimensions');
assert.match(source, /GreenGrow 3D scene unavailable; keeping botanical fallback/u, 'startup errors retain the botanical fallback path');

console.log('BotanicalHeroScene regression checks passed (13 assertions).');
