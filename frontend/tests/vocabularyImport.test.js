import test from 'node:test';
import assert from 'node:assert/strict';

import { parseVocabularyImport } from '../src/utils/vocabularyImport.js';

test('parseVocabularyImport accepts strict JSON arrays', () => {
  const items = parseVocabularyImport(JSON.stringify([
    {
      word: 'hello',
      phonetic: '/həˈləʊ/',
      partOfSpeech: 'int.',
      definition: 'used as a greeting',
      translation: '你好'
    }
  ]));

  assert.equal(items.length, 1);
  assert.equal(items[0].word, 'hello');
});

test('parseVocabularyImport rejects JavaScript object literals', () => {
  assert.throws(
    () => parseVocabularyImport("{ word: 'hello' }"),
    /严格 JSON/
  );
});

test('parseVocabularyImport rejects empty payloads', () => {
  assert.throws(
    () => parseVocabularyImport('[]'),
    /数据不能为空/
  );
});
