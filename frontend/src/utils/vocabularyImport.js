const REQUIRED_FIELDS = ['word', 'phonetic', 'partOfSpeech', 'definition', 'translation'];

function ensureImportItems(value) {
  if (value === null || typeof value !== 'object') {
    throw new Error('JSON 内容必须是对象或数组');
  }

  const items = Array.isArray(value) ? value : [value];
  if (items.length === 0) {
    throw new Error('数据不能为空');
  }

  return items;
}

function validateRequiredFields(items) {
  for (let index = 0; index < items.length; index += 1) {
    const item = items[index];
    if (!item || typeof item !== 'object' || Array.isArray(item)) {
      throw new Error(`第 ${index + 1} 条数据格式无效`);
    }

    const missingField = REQUIRED_FIELDS.find((field) => !item[field]);
    if (missingField) {
      throw new Error(
        `第 ${index + 1} 条缺少必填字段（word/phonetic/partOfSpeech/definition/translation）`
      );
    }
  }
}

export function parseVocabularyImport(input) {
  let parsed;

  try {
    parsed = JSON.parse(input);
  } catch {
    throw new Error('JSON 格式错误，请使用严格 JSON（key 和字符串都需要双引号）');
  }

  const items = ensureImportItems(parsed);
  validateRequiredFields(items);
  return items;
}
