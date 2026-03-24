const express = require('express');
const router = express.Router();
const { profile, skills, projects } = require('../data/portfolio');

// 个人信息
router.get('/profile', (req, res) => {
  res.json({ status: 'success', data: profile });
});

// 技能列表
router.get('/skills', (req, res) => {
  res.json({ status: 'success', data: skills });
});

// 项目列表
router.get('/projects', (req, res) => {
  const { featured } = req.query;
  let data = projects;
  if (featured === 'true') {
    data = projects.filter((p) => p.featured);
  }
  res.json({ status: 'success', data });
});

// 联系表单
router.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({
      status: 'error',
      message: '请填写所有必填字段',
    });
  }
  console.log('📩 收到联系信息:', { name, email, message });
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
