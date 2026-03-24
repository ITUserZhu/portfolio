require('dotenv').config();
const mongoose = require('mongoose');
const { profile, skills, projects } = require('./data/portfolio');
const Profile = require('./models/Profile');
const Skill = require('./models/Skill');
const Project = require('./models/Project');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB 已连接');

    // 清空旧数据
    await Profile.deleteMany({});
    await Skill.deleteMany({});
    await Project.deleteMany({});

    // 导入数据
    await Profile.create(profile);
    console.log('  ✓ Profile 已导入');

    await Skill.insertMany(skills);
    console.log('  ✓ Skills 已导入');

    await Project.insertMany(projects);
    console.log('  ✓ Projects 已导入');

    console.log('\n🎉 数据初始化完成！');
    process.exit(0);
  } catch (err) {
    console.error('❌ 数据初始化失败:', err.message);
    process.exit(1);
  }
};

seed();
