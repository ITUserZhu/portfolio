const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// 注册
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ status: 'error', message: '用户名和密码为必填项' });
    }
    if (username.length < 3 || username.length > 30) {
      return res.status(400).json({ status: 'error', message: '用户名长度 3-30 个字符' });
    }
    if (password.length < 6) {
      return res.status(400).json({ status: 'error', message: '密码至少 6 个字符' });
    }

    const exists = await User.findOne({ username });
    if (exists) {
      return res.status(409).json({ status: 'error', message: '用户名已存在' });
    }

    const user = await User.create({ username, password });
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.status(201).json({ status: 'success', data: { token, user } });
  } catch {
    res.status(500).json({ status: 'error', message: '注册失败，请重试' });
  }
});

// 登录
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ status: 'error', message: '用户名和密码为必填项' });
    }

    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ status: 'error', message: '用户名或密码错误' });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.json({ status: 'success', data: { token, user } });
  } catch {
    res.status(500).json({ status: 'error', message: '登录失败，请重试' });
  }
});

// 获取当前用户信息（需认证）
router.get('/me', require('../middleware/auth'), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ status: 'error', message: '用户不存在' });
    }
    res.json({ status: 'success', data: user });
  } catch {
    res.status(500).json({ status: 'error', message: '服务器错误' });
  }
});

module.exports = router;
