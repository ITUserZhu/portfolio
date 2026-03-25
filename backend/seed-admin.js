const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function seedAdmin() {
  try {
    // 连接数据库
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
    console.log('✅ MongoDB 已连接');

    // 检查是否已存在管理员
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      console.log('✅ 管理员账号已存在:', existingAdmin.username);
      process.exit(0);
    }

    // 检查是否存在 admin 用户
    const existingUser = await User.findOne({ username: 'admin' });
    if (existingUser) {
      // 如果存在 admin 用户，更新其角色为管理员
      existingUser.role = 'admin';
      await existingUser.save();
      console.log('✅ 已将现有 admin 用户升级为管理员');
      console.log('   用户名:', existingUser.username);
      console.log('   角色:', existingUser.role);
      console.log('\n⚠️  请确保 admin 用户的密码安全！');
    } else {
      // 创建管理员账号
      const admin = await User.create({
        username: 'admin',
        password: 'admin123', // 默认密码，建议用户首次登录后修改
        role: 'admin',
        email: 'admin@portfolio.com'
      });

      console.log('✅ 管理员账号创建成功');
      console.log('   用户名:', admin.username);
      console.log('   密码: admin123');
      console.log('   角色:', admin.role);
      console.log('\n⚠️  请务必在首次登录后修改默认密码！');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ 创建管理员账号失败:', error);
    process.exit(1);
  }
}

seedAdmin();