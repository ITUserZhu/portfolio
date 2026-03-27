function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const DEFAULT_VOCABULARY_CATEGORIES = ['daily', 'tech', 'business', 'academic', 'travel', 'tool', 'necessities', 'furniture', 'transportation', '职业', 'fruit', 'vegetable', 'plants', 'mammal', 'arthropod', 'bird', 'fish', 'reptile', 'amphibian'];

function resolveCategoryFilter(category) {
  if (!category) return undefined;
  return String(category) === 'other'
    ? { $nin: DEFAULT_VOCABULARY_CATEGORIES }
    : String(category);
}

function intersectArrays(left, right) {
  const rightSet = new Set(right.map(String));
  return left.filter((item) => rightSet.has(String(item)));
}

function buildVocabularyFilter(query, userState = {}) {
  const { search, category, difficulty, isFavorite, isMastered } = query;
  const { favoriteIds = [], masteredIds = [] } = userState;
  const filter = {};
  let includedIds = null;

  if (search) {
    const safe = escapeRegex(String(search).slice(0, 100));
    filter.$or = [
      { word: { $regex: safe, $options: 'i' } },
      { translation: { $regex: safe, $options: 'i' } },
      { definition: { $regex: safe, $options: 'i' } },
    ];
  }

  const categoryFilter = resolveCategoryFilter(category);
  if (categoryFilter) filter.category = categoryFilter;
  if (difficulty) filter.difficulty = String(difficulty);

  if (isFavorite === 'true') {
    includedIds = favoriteIds.map(String);
  }

  if (isMastered === 'true') {
    const mastered = masteredIds.map(String);
    includedIds = includedIds === null ? mastered : intersectArrays(includedIds, mastered);
  }

  if (includedIds !== null) {
    filter._id = { $in: includedIds };
  }

  return filter;
}

function buildRandomBatchMatch(query = {}) {
  const { category, difficulty, excludeMastered } = query;
  const match = {};
  const categoryFilter = resolveCategoryFilter(category);

  if (categoryFilter) match.category = categoryFilter;
  if (difficulty) match.difficulty = String(difficulty);
  if (excludeMastered === 'true') match.isMastered = false;

  return match;
}

module.exports = {
  buildVocabularyFilter,
  buildRandomBatchMatch,
  DEFAULT_VOCABULARY_CATEGORIES,
};
