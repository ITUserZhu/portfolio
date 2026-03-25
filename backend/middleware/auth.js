const jwt = require('jsonwebtoken');

// 基础认证中间件
function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ status: 'error', message: '未登录' });
  }

  try {
    const token = header.split(' ')[1];
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ status: 'error', message: '登录已过期' });
  }
}

// 可选认证中间件（游客可访问）
function optionalAuth(req, res, next) {
  const header = req.headers.authorization;
  if (header && header.startsWith('Bearer ')) {
    try {
      const token = header.split(' ')[1];
      req.user = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      // token 无效，继续作为游客
    }
  }
  next();
}

// 角色权限检查中间件
function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ status: 'error', message: '未登录' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ status: 'error', message: '权限不足' });
    }
    next();
  };
}

// 检查是否为管理员
function requireAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ status: 'error', message: '未登录' });
  }
  if (req.user.role !== 'admin') {
    return res.status(403).json({ status: 'error', message: '需要管理员权限' });
  }
  next();
}

// 检查是否登录（任何已登录用户）
function requireAuth(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ status: 'error', message: '请先登录' });
  }
  next();
}

module.exports = {
  auth,
  optionalAuth,
  requireRole,
  requireAdmin,
  requireAuth
};
