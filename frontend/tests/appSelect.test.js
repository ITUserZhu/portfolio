import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

test('AppSelect exists and wraps a native select with daisyUI classes', () => {
  const filePath = new URL('../src/components/AppSelect.vue', import.meta.url);

  assert.equal(existsSync(filePath), true);

  const source = readFileSync(filePath, 'utf8');

  assert.match(source, /<select/);
  assert.match(source, /select select-bordered/);
  assert.match(source, /defineModel/);
  assert.match(source, /<slot/);
});

test('AppSelect supports a toolbar variant and the vocabulary toolbar uses it', () => {
  const selectSource = readFileSync(new URL('../src/components/AppSelect.vue', import.meta.url), 'utf8');
  const vocabularyPageSource = readFileSync(
    new URL('../src/views/VocabularyPage.vue', import.meta.url),
    'utf8'
  );

  assert.match(selectSource, /variant/);
  assert.match(selectSource, /toolbar/);
  assert.match(vocabularyPageSource, /variant="toolbar"/);
});
