function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
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

  if (category) filter.category = String(category);
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

module.exports = {
  buildVocabularyFilter,
};
