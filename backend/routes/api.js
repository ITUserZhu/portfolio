const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Profile = require('../models/Profile');
const Skill = require('../models/Skill');
const Project = require('../models/Project');
const Contact = require('../models/Contact');
const Vocabulary = require('../models/Vocabulary');

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

// 获取词汇列表（公开读取）
router.get('/vocabulary', async (req, res) => {
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
    if (isFavorite !== undefined) filter.isFavorite = isFavorite === 'true';
    if (isMastered !== undefined) filter.isMastered = isMastered === 'true';

    const skip = (page - 1) * limit;
    const [vocabularies, total] = await Promise.all([
      Vocabulary.find(filter).sort({ isFavorite: -1, createdAt: -1 }).skip(skip).limit(limit),
      Vocabulary.countDocuments(filter),
    ]);

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
router.get('/vocabulary/random-batch', async (req, res) => {
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

// 词汇统计（公开）
router.get('/vocabulary-stats', async (req, res) => {
  try {
    const [total, mastered, favorites, byCategory, byDifficulty] = await Promise.all([
      Vocabulary.countDocuments(),
      Vocabulary.countDocuments({ isMastered: true }),
      Vocabulary.countDocuments({ isFavorite: true }),
      Vocabulary.aggregate([{ $group: { _id: '$category', count: { $sum: 1 } } }]),
      Vocabulary.aggregate([{ $group: { _id: '$difficulty', count: { $sum: 1 } } }]),
    ]);
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

// 获取单个词汇（公开）
router.get('/vocabulary/:id', async (req, res) => {
  try {
    const vocabulary = await Vocabulary.findById(req.params.id);
    if (!vocabulary) return res.status(404).json({ status: 'error', message: '词汇不存在' });
    res.json({ status: 'success', data: vocabulary });
  } catch {
    res.status(500).json({ status: 'error', message: '服务器错误' });
  }
});

// ==================== 以下接口需要认证 ====================

// 添加词汇
router.post('/vocabulary', auth, async (req, res) => {
  try {
    const { word, phonetic, partOfSpeech, definition, translation } = req.body;
    if (!word || !phonetic || !partOfSpeech || !definition || !translation) {
      return res.status(400).json({ status: 'error', message: '请填写所有必填字段' });
    }
    const vocabulary = await Vocabulary.create(req.body);
    res.status(201).json({ status: 'success', data: vocabulary, message: '词汇添加成功' });
  } catch {
    res.status(400).json({ status: 'error', message: '添加失败，请检查输入' });
  }
});

// 更新词汇
router.put('/vocabulary/:id', auth, async (req, res) => {
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

// 删除词汇
router.delete('/vocabulary/:id', auth, async (req, res) => {
  try {
    const vocabulary = await Vocabulary.findByIdAndDelete(req.params.id);
    if (!vocabulary) return res.status(404).json({ status: 'error', message: '词汇不存在' });
    res.json({ status: 'success', message: '词汇删除成功' });
  } catch {
    res.status(500).json({ status: 'error', message: '服务器错误' });
  }
});

// 切换收藏状态
router.patch('/vocabulary/:id/favorite', auth, async (req, res) => {
  try {
    const vocabulary = await Vocabulary.findById(req.params.id);
    if (!vocabulary) return res.status(404).json({ status: 'error', message: '词汇不存在' });
    vocabulary.isFavorite = !vocabulary.isFavorite;
    await vocabulary.save();
    res.json({
      status: 'success',
      data: vocabulary,
      message: vocabulary.isFavorite ? '已添加到收藏' : '已取消收藏',
    });
  } catch {
    res.status(500).json({ status: 'error', message: '服务器错误' });
  }
});

// 切换掌握状态
router.patch('/vocabulary/:id/mastered', auth, async (req, res) => {
  try {
    const vocabulary = await Vocabulary.findById(req.params.id);
    if (!vocabulary) return res.status(404).json({ status: 'error', message: '词汇不存在' });
    vocabulary.isMastered = !vocabulary.isMastered;
    await vocabulary.save();
    res.json({
      status: 'success',
      data: vocabulary,
      message: vocabulary.isMastered ? '已标记为已掌握' : '已标记为未掌握',
    });
  } catch {
    res.status(500).json({ status: 'error', message: '服务器错误' });
  }
});

module.exports = router;
