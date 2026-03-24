const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const Skill = require('../models/Skill');
const Project = require('../models/Project');
const Contact = require('../models/Contact');

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

module.exports = router;
