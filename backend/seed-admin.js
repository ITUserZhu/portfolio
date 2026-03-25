require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'admin123';

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB 已连接');

    const exists = await User.findOne({ username: ADMIN_USER });
    if (exists) {
      console.log(`  ✓ 管理员账号 "${ADMIN_USER}" 已存在，跳过`);
    } else {
      await User.create({ username: ADMIN_USER, password: ADMIN_PASS });
      console.log(`  ✓ 管理员账号已创建: ${ADMIN_USER} / ${ADMIN_PASS}`);
      console.log('  ⚠ 请登录后修改密码，或在 .env 中配置 ADMIN_USER 和 ADMIN_PASS');
    }

    process.exit(0);
  } catch (err) {
    console.error('❌ 失败:', err.message);
    process.exit(1);
  }
}

seedAdmin();
