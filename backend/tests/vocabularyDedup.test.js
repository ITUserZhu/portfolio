const test = require('node:test');
const assert = require('node:assert/strict');

const { filterDuplicateVocabularyItems } = require('../utils/vocabularyDedup');

function createItem(word) {
  return {
    word,
    phonetic: '/demo/',
    partOfSpeech: 'n.',
    definition: 'demo definition',
    translation: '示例',
  };
}

test('filterDuplicateVocabularyItems removes duplicates from payload and database', () => {
  const result = filterDuplicateVocabularyItems(
    [
      createItem('Hello'),
      createItem(' hello '),
      createItem('World'),
      createItem('Existing'),
    ],
    ['existing']
  );

  assert.deepEqual(
    result.itemsToInsert.map((item) => item.word),
    ['Hello', 'World']
  );
  assert.equal(result.skippedCount, 2);
  assert.deepEqual(result.skippedWords, ['hello', 'existing']);
});

test('filterDuplicateVocabularyItems keeps the first occurrence for case-insensitive duplicates', () => {
  const result = filterDuplicateVocabularyItems(
    [createItem('Apple'), createItem('APPLE'), createItem('apple ')],
    []
  );

  assert.deepEqual(
    result.itemsToInsert.map((item) => item.word),
    ['Apple']
  );
  assert.equal(result.skippedCount, 2);
  assert.deepEqual(result.skippedWords, ['apple']);
});
