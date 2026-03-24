const mongoose = require('mongoose');
const Vocabulary = require('./models/Vocabulary');
const vocabularies = require('./data/vocabulary');
require('dotenv').config();

async function seedVocabulary() {
  try {
    // 连接数据库
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
    console.log('✅ MongoDB 已连接');

    // 清空现有词汇数据
    await Vocabulary.deleteMany({});
    console.log('🗑️  已清空现有词汇数据');

    // 插入新的词汇数据
    const result = await Vocabulary.insertMany(vocabularies);
    console.log(`✅ 成功添加 ${result.length} 个词汇`);

    // 显示统计信息
    const stats = await Vocabulary.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    console.log('\n📊 词汇分类统计:');
    stats.forEach(stat => {
      console.log(`   ${stat._id}: ${stat.count} 个`);
    });

    const difficultyStats = await Vocabulary.aggregate([
      {
        $group: {
          _id: '$difficulty',
          count: { $sum: 1 }
        }
      }
    ]);

    console.log('\n📈 难度等级统计:');
    difficultyStats.forEach(stat => {
      console.log(`   ${stat._id}: ${stat.count} 个`);
    });

    console.log('\n🎉 词汇数据初始化完成！');
    process.exit(0);
  } catch (error) {
    console.error('❌ 初始化失败:', error);
    process.exit(1);
  }
}

seedVocabulary();