const test = require('node:test');
const assert = require('node:assert/strict');

const { buildVocabularyFilter, buildRandomBatchMatch } = require('../utils/vocabularyQuery');

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

test('buildVocabularyFilter maps category=other to all non-default categories', () => {
  const filter = buildVocabularyFilter(
    { category: 'other' },
    { favoriteIds: [], masteredIds: [] }
  );

  assert.deepEqual(filter.category, {
    $nin: ['daily', 'tech', 'business', 'academic', 'travel'],
  });
});

test('buildVocabularyFilter keeps other category aggregation when combined with mastered ids', () => {
  const filter = buildVocabularyFilter(
    { category: 'other', isMastered: 'true' },
    { favoriteIds: [], masteredIds: ['word-2'] }
  );

  assert.deepEqual(filter.category, {
    $nin: ['daily', 'tech', 'business', 'academic', 'travel'],
  });
  assert.deepEqual(filter._id, { $in: ['word-2'] });
});

test('buildRandomBatchMatch maps category=other to all non-default categories', () => {
  const match = buildRandomBatchMatch({ category: 'other' });

  assert.deepEqual(match.category, {
    $nin: ['daily', 'tech', 'business', 'academic', 'travel'],
  });
});

test('buildRandomBatchMatch preserves difficulty and excludeMastered with other categories', () => {
  const match = buildRandomBatchMatch({
    category: 'other',
    difficulty: 'advanced',
    excludeMastered: 'true',
  });

  assert.deepEqual(match, {
    category: { $nin: ['daily', 'tech', 'business', 'academic', 'travel'] },
    difficulty: 'advanced',
    isMastered: false,
  });
});
