import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../src/views/VocabularyPage.vue', import.meta.url), 'utf8');

test('VocabularyPage shows a custom category field when selecting other', () => {
  assert.match(source, /const customCategory = ref\(''\)/);
  assert.match(source, /const showCustomCategoryField = computed\(\(\) => form\.category === 'other'\)/);
  assert.match(source, /v-if="showCustomCategoryField"/);
  assert.match(source, /v-model="customCategory"/);
});

test('VocabularyPage submits the real custom category instead of the literal other value', () => {
  assert.match(source, /const resolvedCategory = form\.category === 'other'/);
  assert.match(source, /customCategory\.value\.trim\(\)/);
  assert.match(source, /category: resolvedCategory/);
});
