const express = require('express');
const router = express.Router();
const { auth, optionalAuth, requireAuth, requireAdmin } = require('../middleware/auth');
const Profile = require('../models/Profile');
const Skill = require('../models/Skill');
const Project = require('../models/Project');
const Contact = require('../models/Contact');
const Vocabulary = require('../models/Vocabulary');
const {
  normalizeVocabularyWord,
  filterDuplicateVocabularyItems,
} = require('../utils/vocabularyDedup');

// 转义正则特殊字符，防止 NoSQL 注入
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ==================== 公开接口（无需认证） ====================

// 个人信息
router.get('/profile', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json({ status: 'success', data: profile });
  } catch {
    res.status(500).json({ status: 'error', message: '服务器错误' });
  }
});

// 技能列表
router.get('/skills', async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json({ status: 'success', data: skills });
  } catch {
    res.status(500).json({ status: 'error', message: '服务器错误' });
  }
});

// 项目列表
router.get('/projects', async (req, res) => {
  try {
    const { featured } = req.query;
    const filter = featured === 'true' ? { featured: true } : {};
    const projects = await Project.find(filter);
    res.json({ status: 'success', data: projects });
  } catch {
    res.status(500).json({ status: 'error', message: '服务器错误' });
  }
});

// 联系表单（公开但有速率限制）
router.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ status: 'error', message: '请填写所有必填字段' });
    }
    // 基本校验
    if (typeof name !== 'string' || name.length > 100) {
      return res.status(400).json({ status: 'error', message: '姓名格式无效' });
    }
    if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ status: 'error', message: '邮箱格式无效' });
    }
    if (typeof message !== 'string' || message.length > 5000) {
      return res.status(400).json({ status: 'error', message: '消息过长' });
    }
    await Contact.create({ name: name.trim(), email: email.trim(), message: message.trim() });
    res.json({ status: 'success', message: '感谢您的来信，我会尽快回复！' });
  } catch {
    res.status(500).json({ status: 'error', message: '提交失败，请重试' });
  }
});

// 健康检查
router.get('/health', (req, res) => {
  res.json({ status: 'success', message: 'API is running', timestamp: new Date().toISOString() });
});

// ==================== 词汇 API ====================

// 获取词汇列表（公开读取）- 游客可访问
router.get('/vocabulary', optionalAuth, async (req, res) => {
  try {
    const { search, category, difficulty, isFavorite, isMastered } = req.query;
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
    const filter = {};

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

    const skip = (page - 1) * limit;
    let vocabularies = await Vocabulary.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit);
    const total = await Vocabulary.countDocuments(filter);

    // 如果用户已登录，获取用户的收藏和掌握状态
    if (req.user) {
      const User = require('../models/User');
      const user = await User.findById(req.user.id);
      if (user) {
        vocabularies = vocabularies.map(vocab => {
          const vocabObj = vocab.toObject();
          vocabObj.isFavorite = user.favorites.includes(vocab._id);
          vocabObj.isMastered = user.mastered.includes(vocab._id);
          return vocabObj;
        });
      }
    }

    // 应用筛选
    if (isFavorite !== undefined) {
      vocabularies = vocabularies.filter(v => v.isFavorite === (isFavorite === 'true'));
    }
    if (isMastered !== undefined) {
      vocabularies = vocabularies.filter(v => v.isMastered === (isMastered === 'true'));
    }

    res.json({
      status: 'success',
      data: vocabularies,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch {
    res.status(500).json({ status: 'error', message: '服务器错误' });
  }
});

// 随机批量获取词汇（记忆模式，公开）— 必须在 /:id 之前
router.get('/vocabulary/random-batch', optionalAuth, async (req, res) => {
  try {
    const size = Math.min(100, Math.max(1, parseInt(req.query.size) || 30));
    const { category, difficulty, excludeMastered } = req.query;
    const match = {};
    if (category) match.category = String(category);
    if (difficulty) match.difficulty = String(difficulty);
    if (excludeMastered === 'true') match.isMastered = false;

    const pipeline = [];
    if (Object.keys(match).length > 0) pipeline.push({ $match: match });
    pipeline.push({ $sample: { size } });

    const vocabularies = await Vocabulary.aggregate(pipeline);
    res.json({ status: 'success', data: vocabularies, total: vocabularies.length });
  } catch {
    res.status(500).json({ status: 'error', message: '服务器错误' });
  }
});

// 词汇统计（公开）- 游客可访问
router.get('/vocabulary-stats', optionalAuth, async (req, res) => {
  try {
    const total = await Vocabulary.countDocuments();
    const byCategory = await Vocabulary.aggregate([{ $group: { _id: '$category', count: { $sum: 1 } } }]);
    const byDifficulty = await Vocabulary.aggregate([{ $group: { _id: '$difficulty', count: { $sum: 1 } } }]);
    
    let mastered = 0;
    let favorites = 0;
    
    // 如果用户已登录，获取用户的收藏和掌握数量
    if (req.user) {
      const User = require('../models/User');
      const user = await User.findById(req.user.id);
      if (user) {
        favorites = user.favorites.length;
        mastered = user.mastered.length;
      }
    }
    
    res.json({
      status: 'success',
      data: {
        total,
        mastered,
        favorites,
        byCategory: byCategory.reduce((acc, i) => { acc[i._id] = i.count; return acc; }, {}),
        byDifficulty: byDifficulty.reduce((acc, i) => { acc[i._id] = i.count; return acc; }, {}),
      },
    });
  } catch {
    res.status(500).json({ status: 'error', message: '服务器错误' });
  }
});

// 获取单个词汇（公开）- 游客可访问
router.get('/vocabulary/:id', optionalAuth, async (req, res) => {
  try {
    const vocabulary = await Vocabulary.findById(req.params.id);
    if (!vocabulary) return res.status(404).json({ status: 'error', message: '词汇不存在' });
    res.json({ status: 'success', data: vocabulary });
  } catch {
    res.status(500).json({ status: 'error', message: '服务器错误' });
  }
});

// ==================== 以下接口需要认证 ====================

// 添加词汇（支持单个对象或数组批量导入）- 仅管理员
router.post('/vocabulary', auth, requireAdmin, async (req, res) => {
  try {
    const items = Array.isArray(req.body) ? req.body : [req.body];
    if (items.length === 0) {
      return res.status(400).json({ status: 'error', message: '数据不能为空' });
    }
    if (items.length > 200) {
      return res.status(400).json({ status: 'error', message: '单次最多导入 200 条' });
    }
    // 校验每条数据的必填字段
    for (let i = 0; i < items.length; i++) {
      const { word, phonetic, partOfSpeech, definition, translation } = items[i];
      if (!word || !phonetic || !partOfSpeech || !definition || !translation) {
        return res.status(400).json({
          status: 'error',
          message: `第 ${i + 1} 条数据缺少必填字段（word/phonetic/partOfSpeech/definition/translation）`,
        });
      }
    }

    const normalizedWords = [
      ...new Set(items.map((item) => normalizeVocabularyWord(item.word)).filter(Boolean)),
    ];
    const existingDocs = normalizedWords.length
      ? await Vocabulary.find({
          $or: normalizedWords.map((word) => ({
            word: { $regex: `^${escapeRegex(word)}$`, $options: 'i' },
          })),
        }).select('word')
      : [];
    const existingWords = existingDocs.map((doc) => doc.word);
    const { itemsToInsert, skippedCount, skippedWords } = filterDuplicateVocabularyItems(
      items,
      existingWords
    );

    if (itemsToInsert.length === 0) {
      return res.json({
        status: 'success',
        data: [],
        message: `没有新增词汇，已跳过 ${skippedCount} 条重复单词`,
        meta: { insertedCount: 0, skippedCount, skippedWords },
      });
    }

    const result = await Vocabulary.insertMany(itemsToInsert, { ordered: false });
    const message = skippedCount > 0
      ? `成功添加 ${result.length} 条词汇，跳过 ${skippedCount} 条重复单词`
      : `成功添加 ${result.length} 条词汇`;

    res.status(201).json({
      status: 'success',
      data: result,
      message,
      meta: { insertedCount: result.length, skippedCount, skippedWords },
    });
  } catch {
    res.status(400).json({ status: 'error', message: '添加失败，请检查输入格式' });
  }
});

// 更新词汇 - 仅管理员
router.put('/vocabulary/:id', auth, requireAdmin, async (req, res) => {
  try {
    const vocabulary = await Vocabulary.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!vocabulary) return res.status(404).json({ status: 'error', message: '词汇不存在' });
    res.json({ status: 'success', data: vocabulary, message: '词汇更新成功' });
  } catch {
    res.status(400).json({ status: 'error', message: '更新失败，请检查输入' });
  }
});

// 删除词汇 - 仅管理员
router.delete('/vocabulary/:id', auth, requireAdmin, async (req, res) => {
  try {
    const vocabulary = await Vocabulary.findByIdAndDelete(req.params.id);
    if (!vocabulary) return res.status(404).json({ status: 'error', message: '词汇不存在' });
    res.json({ status: 'success', message: '词汇删除成功' });
  } catch {
    res.status(500).json({ status: 'error', message: '服务器错误' });
  }
});

// 切换收藏状态 - 需要登录
router.patch('/vocabulary/:id/favorite', auth, requireAuth, async (req, res) => {
  try {
    const User = require('../models/User');
    const vocabulary = await Vocabulary.findById(req.params.id);
    if (!vocabulary) return res.status(404).json({ status: 'error', message: '词汇不存在' });
    
    // 确保 req.user.id 存在
    if (!req.user || !req.user.id) {
      return res.status(401).json({ status: 'error', message: '用户认证失败' });
    }
    
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ status: 'error', message: '用户不存在' });
    
    const isFavorite = user.favorites.includes(vocabulary._id);
    if (isFavorite) {
      user.favorites.pull(vocabulary._id);
    } else {
      user.favorites.push(vocabulary._id);
    }
    await user.save();
    
    res.json({
      status: 'success',
      data: { isFavorite: !isFavorite },
      message: !isFavorite ? '已添加到收藏' : '已取消收藏',
    });
  } catch (error) {
    console.error('收藏操作失败:', error);
    res.status(500).json({ status: 'error', message: '服务器错误' });
  }
});

// 切换掌握状态 - 需要登录
router.patch('/vocabulary/:id/mastered', auth, requireAuth, async (req, res) => {
  try {
    const User = require('../models/User');
    const vocabulary = await Vocabulary.findById(req.params.id);
    if (!vocabulary) return res.status(404).json({ status: 'error', message: '词汇不存在' });
    
    // 确保 req.user.id 存在
    if (!req.user || !req.user.id) {
      return res.status(401).json({ status: 'error', message: '用户认证失败' });
    }
    
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ status: 'error', message: '用户不存在' });
    
    const isMastered = user.mastered.includes(vocabulary._id);
    if (isMastered) {
      user.mastered.pull(vocabulary._id);
    } else {
      user.mastered.push(vocabulary._id);
    }
    await user.save();
    
    res.json({
      status: 'success',
      data: { isMastered: !isMastered },
      message: !isMastered ? '已标记为已掌握' : '已标记为未掌握',
    });
  } catch (error) {
    console.error('掌握操作失败:', error);
    res.status(500).json({ status: 'error', message: '服务器错误' });
  }
});

module.exports = router;
