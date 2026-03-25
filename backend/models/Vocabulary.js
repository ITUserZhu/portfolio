const mongoose = require('mongoose');

const vocabularySchema = new mongoose.Schema({
  word: {
    type: String,
    required: [true, '单词是必填项'],
    trim: true,
    index: true
  },
  phonetic: {
    type: String,
    required: [true, '音标是必填项'],
    trim: true
  },
  partOfSpeech: {
    type: String,
    required: [true, '词性是必填项'],
    trim: true
  },
  definition: {
    type: String,
    required: [true, '英文释义是必填项'],
    trim: true
  },
  translation: {
    type: String,
    required: [true, '中文翻译是必填项'],
    trim: true
  },
  phrases: [{
    phrase: {
      type: String,
      required: true,
      trim: true
    },
    translation: {
      type: String,
      required: true,
      trim: true
    }
  }],
  examples: [{
    sentence: {
      type: String,
      required: true,
      trim: true
    },
    translation: {
      type: String,
      required: true,
      trim: true
    }
  }],
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  category: {
    type: String,
    default: 'daily'
  },
  isFavorite: {
    type: Boolean,
    default: false
  },
  isMastered: {
    type: Boolean,
    default: false
  },
  audioUrl: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// 创建文本索引以支持搜索
vocabularySchema.index({ word: 'text', translation: 'text', definition: 'text' });

module.exports = mongoose.model('Vocabulary', vocabularySchema);