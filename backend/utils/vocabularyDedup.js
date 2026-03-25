function normalizeVocabularyWord(word) {
  return String(word || '').trim().toLowerCase();
}

function filterDuplicateVocabularyItems(items, existingWords = []) {
  const seenWords = new Set(
    existingWords.map((word) => normalizeVocabularyWord(word)).filter(Boolean)
  );
  const skippedWordSet = new Set();
  const itemsToInsert = [];

  for (const item of items) {
    const normalizedWord = normalizeVocabularyWord(item.word);

    if (!normalizedWord) {
      continue;
    }

    if (seenWords.has(normalizedWord)) {
      skippedWordSet.add(normalizedWord);
      continue;
    }

    seenWords.add(normalizedWord);
    itemsToInsert.push(item);
  }

  return {
    itemsToInsert,
    skippedCount: items.length - itemsToInsert.length,
    skippedWords: [...skippedWordSet],
  };
}

module.exports = {
  normalizeVocabularyWord,
  filterDuplicateVocabularyItems,
};
