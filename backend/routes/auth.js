const express = require('express');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const User = require('../models/User');
const {
  normalizeUsername,
  validateUsername,
  validatePassword,
  comparePasswordSafely,
} = require('../utils/authSecurity');

const router = express.Router();
const authTokenTtl = process.env.AUTH_TOKEN_TTL || '7d';

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { status: 'error', message: '注册尝试过于频繁，请稍后再试' },
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 8,
  skipSuccessfulRequests: true,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { status: 'error', message: '登录尝试过于频繁，请稍后再试' },
});

// 注册
router.post('/register', registerLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;

    if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
      return res.status(400).json({ status: 'error', message: '用户名和密码为必填项' });
    }

    const normalizedUsername = normalizeUsername(username);
    const usernameValidation = validateUsername(normalizedUsername);
    if (!usernameValidation.valid) {
      return res.status(400).json({ status: 'error', message: usernameValidation.message });
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return res.status(400).json({ status: 'error', message: passwordValidation.message });
    }

    const exists = await User.findOne({ username: normalizedUsername }).select('_id');
    if (exists) {
      return res.status(400).json({ status: 'error', message: '注册失败，请检查输入或稍后再试' });
    }

    const user = await User.create({ username: normalizedUsername, password });
    res.status(201).json({
      status: 'success',
      message: '注册成功，请登录',
      data: { username: user.username },
    });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(400).json({ status: 'error', message: '注册失败，请检查输入或稍后再试' });
    }

    res.status(500).json({ status: 'error', message: '注册失败，请重试' });
  }
});

// 登录
router.post('/login', loginLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;

    if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
      return res.status(400).json({ status: 'error', message: '用户名和密码为必填项' });
    }

    const normalizedUsername = normalizeUsername(username);
    const user = await User.findOne({ username: normalizedUsername });
    const passwordMatches = await comparePasswordSafely(user, password);

    if (!user || !passwordMatches || !user.isActive) {
      return res.status(401).json({ status: 'error', message: '用户名或密码错误' });
    }

    const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: authTokenTtl,
    });

    res.json({ status: 'success', data: { token, user } });
  } catch {
    res.status(500).json({ status: 'error', message: '登录失败，请重试' });
  }
});

// 获取当前用户信息（需认证）
router.get('/me', require('../middleware/auth').auth, async (req, res) => {
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
