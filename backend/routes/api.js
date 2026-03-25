const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const Skill = require('../models/Skill');
const Project = require('../models/Project');
const Contact = require('../models/Contact');
const Vocabulary = require('../models/Vocabulary');

// 个人信息
router.get('/profile', async (req, res) => {
  const profile = await Profile.findOne();
  res.json({ status: 'success', data: profile });
});

// 技能列表
router.get('/skills', async (req, res) => {
  const skills = await Skill.find();
  res.json({ status: 'success', data: skills });
});

// 项目列表
router.get('/projects', async (req, res) => {
  const { featured } = req.query;
  const filter = featured === 'true' ? { featured: true } : {};
  const projects = await Project.find(filter);
  res.json({ status: 'success', data: projects });
});

// 联系表单
router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({
      status: 'error',
      message: '请填写所有必填字段',
    });
  }
  await Contact.create({ name, email, message });
  res.json({
    status: 'success',
    message: '感谢您的来信，我会尽快回复！',
  });
});

// 健康检查
router.get('/health', (req, res) => {
  res.json({
    status: 'success',
    message: 'API is running',
    timestamp: new Date().toISOString(),
  });
});

// ==================== 词汇 API ====================

// 获取词汇列表（支持搜索、筛选、分页）
router.get('/vocabulary', async (req, res) => {
  try {
    const { 
      search, 
      category, 
      difficulty, 
      isFavorite, 
      isMastered,
      page = 1, 
      limit = 20 
    } = req.query;
    
    const filter = {};
    
    // 搜索功能
    if (search) {
      filter.$or = [
        { word: { $regex: search, $options: 'i' } },
        { translation: { $regex: search, $options: 'i' } },
        { definition: { $regex: search, $options: 'i' } }
      ];
    }
    
    // 筛选功能
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;
    if (isFavorite !== undefined) filter.isFavorite = isFavorite === 'true';
    if (isMastered !== undefined) filter.isMastered = isMastered === 'true';
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [vocabularies, total] = await Promise.all([
      Vocabulary.find(filter)
        .sort({ isFavorite: -1, createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Vocabulary.countDocuments(filter)
    ]);
    
    res.json({
      status: 'success',
      data: vocabularies,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
});

// 随机批量获取词汇（记忆模式）— 必须在 /:id 之前
router.get('/vocabulary/random-batch', async (req, res) => {
  try {
    const { size = 30, category, difficulty, excludeMastered } = req.query;
    const match = {};
    if (category) match.category = category;
    if (difficulty) match.difficulty = difficulty;
    if (excludeMastered === 'true') match.isMastered = false;

    const pipeline = [];
    if (Object.keys(match).length > 0) {
      pipeline.push({ $match: match });
    }
    pipeline.push({ $sample: { size: parseInt(size) } });

    const vocabularies = await Vocabulary.aggregate(pipeline);
    res.json({
      status: 'success',
      data: vocabularies,
      total: vocabularies.length
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
});

// 获取单个词汇
router.get('/vocabulary/:id', async (req, res) => {
  try {
    const vocabulary = await Vocabulary.findById(req.params.id);
    if (!vocabulary) {
      return res.status(404).json({
        status: 'error',
        message: '词汇不存在'
      });
    }
    res.json({
      status: 'success',
      data: vocabulary
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
});

// 添加词汇
router.post('/vocabulary', async (req, res) => {
  try {
    const vocabulary = await Vocabulary.create(req.body);
    res.status(201).json({
      status: 'success',
      data: vocabulary,
      message: '词汇添加成功'
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message
    });
  }
});

// 更新词汇
router.put('/vocabulary/:id', async (req, res) => {
  try {
    const vocabulary = await Vocabulary.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!vocabulary) {
      return res.status(404).json({
        status: 'error',
        message: '词汇不存在'
      });
    }
    res.json({
      status: 'success',
      data: vocabulary,
      message: '词汇更新成功'
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message
    });
  }
});

// 删除词汇
router.delete('/vocabulary/:id', async (req, res) => {
  try {
    const vocabulary = await Vocabulary.findByIdAndDelete(req.params.id);
    if (!vocabulary) {
      return res.status(404).json({
        status: 'error',
        message: '词汇不存在'
      });
    }
    res.json({
      status: 'success',
      message: '词汇删除成功'
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
});

// 切换收藏状态
router.patch('/vocabulary/:id/favorite', async (req, res) => {
  try {
    const vocabulary = await Vocabulary.findById(req.params.id);
    if (!vocabulary) {
      return res.status(404).json({
        status: 'error',
        message: '词汇不存在'
      });
    }
    vocabulary.isFavorite = !vocabulary.isFavorite;
    await vocabulary.save();
    res.json({
      status: 'success',
      data: vocabulary,
      message: vocabulary.isFavorite ? '已添加到收藏' : '已取消收藏'
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
});

// 切换掌握状态
router.patch('/vocabulary/:id/mastered', async (req, res) => {
  try {
    const vocabulary = await Vocabulary.findById(req.params.id);
    if (!vocabulary) {
      return res.status(404).json({
        status: 'error',
        message: '词汇不存在'
      });
    }
    vocabulary.isMastered = !vocabulary.isMastered;
    await vocabulary.save();
    res.json({
      status: 'success',
      data: vocabulary,
      message: vocabulary.isMastered ? '已标记为已掌握' : '已标记为未掌握'
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
});

// 获取词汇统计
router.get('/vocabulary-stats', async (req, res) => {
  try {
    const [total, mastered, favorites, byCategory, byDifficulty] = await Promise.all([
      Vocabulary.countDocuments(),
      Vocabulary.countDocuments({ isMastered: true }),
      Vocabulary.countDocuments({ isFavorite: true }),
      Vocabulary.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } }
      ]),
      Vocabulary.aggregate([
        { $group: { _id: '$difficulty', count: { $sum: 1 } } }
      ])
    ]);
    
    res.json({
      status: 'success',
      data: {
        total,
        mastered,
        favorites,
        byCategory: byCategory.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {}),
        byDifficulty: byDifficulty.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {})
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
});

module.exports = router;
