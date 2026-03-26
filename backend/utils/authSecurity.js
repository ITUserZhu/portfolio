const bcrypt = require('bcryptjs');

const USERNAME_PATTERN = /^[a-z0-9_-]{3,30}$/;
const DUMMY_PASSWORD_HASH = '$2b$10$jV65Fz9vGear1V/XNF0AV.T91i7WgKXAyzA5QYPXsJYj9QqmxiBAe';

function normalizeUsername(username) {
  return String(username || '').trim().toLowerCase();
}

function validateUsername(username) {
  if (!USERNAME_PATTERN.test(username)) {
    return {
      valid: false,
      message: '用户名需为 3-30 位，只能包含小写字母、数字、下划线和连字符',
    };
  }

  return { valid: true };
}

function validatePassword(password) {
  const value = String(password || '');

  if (value.length < 8) {
    return { valid: false, message: '密码至少 8 个字符' };
  }

  if (!/[A-Za-z]/.test(value) || !/\d/.test(value)) {
    return { valid: false, message: '密码需同时包含字母和数字' };
  }

  return { valid: true };
}

async function comparePasswordSafely(user, password) {
  const candidate = String(password || '');

  if (!user) {
    await bcrypt.compare(candidate, DUMMY_PASSWORD_HASH);
    return false;
  }

  return user.comparePassword(candidate);
}

module.exports = {
  normalizeUsername,
  validateUsername,
  validatePassword,
  comparePasswordSafely,
};
