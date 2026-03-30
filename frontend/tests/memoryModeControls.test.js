import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../src/views/MemoryMode.vue', import.meta.url), 'utf8');

function getFunctionBody(name) {
  const signature = `async function ${name}()`;
  const start = source.indexOf(signature);

  assert.notEqual(start, -1, `${name} should exist`);

  const bodyStart = source.indexOf('{', start);
  let depth = 0;

  for (let i = bodyStart; i < source.length; i++) {
    const char = source[i];

    if (char === '{') depth++;
    if (char === '}') depth--;

    if (depth === 0) {
      return source.slice(bodyStart + 1, i);
    }
  }

  assert.fail(`Could not extract ${name} body`);
}

test('MemoryMode binds bottom-bar favorite and mastered buttons to in-place toggles', () => {
  assert.match(source, /@click="toggleFavoriteInPlace"/);
  assert.match(source, /@click="toggleMasteredInPlace"/);
});

test('MemoryMode keeps swipe gestures bound to the advance handlers', () => {
  assert.match(source, /onSwipeLeft:\s*\(\)\s*=>\s*\{[\s\S]*handleMastered\(\)/);
  assert.match(source, /onSwipeRight:\s*\(\)\s*=>\s*\{[\s\S]*handleFavorite\(\)/);
});

test('MemoryMode in-place toggle handlers do not animate out or advance the index', () => {
  const favoriteBody = getFunctionBody('toggleFavoriteInPlace');
  const masteredBody = getFunctionBody('toggleMasteredInPlace');

  assert.doesNotMatch(favoriteBody, /animateOut/);
  assert.doesNotMatch(favoriteBody, /currentIndex\.value\+\+|currentIndex\.value \+\+/);
  assert.doesNotMatch(masteredBody, /animateOut/);
  assert.doesNotMatch(masteredBody, /currentIndex\.value\+\+|currentIndex\.value \+\+/);
});

test('MemoryMode swipe handlers still animate and advance after toggling state', () => {
  const favoriteBody = getFunctionBody('handleFavorite');
  const masteredBody = getFunctionBody('handleMastered');

  assert.match(favoriteBody, /animateOut\('right'\)/);
  assert.match(favoriteBody, /currentIndex\.value\+\+/);
  assert.match(masteredBody, /animateOut\('left'\)/);
  assert.match(masteredBody, /currentIndex\.value\+\+/);
});
