const test = require('node:test');
const assert = require('node:assert/strict');

const { buildVocabularyFilter } = require('../utils/vocabularyQuery');

test('buildVocabularyFilter scopes favorite filtering to the current user ids', () => {
  const filter = buildVocabularyFilter(
    { isFavorite: 'true' },
    { favoriteIds: ['fav-1', 'fav-2'], masteredIds: [] }
  );

  assert.deepEqual(filter._id, { $in: ['fav-1', 'fav-2'] });
});

test('buildVocabularyFilter returns an empty favorite set for guests', () => {
  const filter = buildVocabularyFilter(
    { isFavorite: 'true' },
    { favoriteIds: [], masteredIds: [] }
  );

  assert.deepEqual(filter._id, { $in: [] });
});

test('buildVocabularyFilter combines mastered ids with existing filters', () => {
  const filter = buildVocabularyFilter(
    { category: 'daily', isMastered: 'true' },
    { favoriteIds: [], masteredIds: ['word-1'] }
  );

  assert.equal(filter.category, 'daily');
  assert.deepEqual(filter._id, { $in: ['word-1'] });
});
