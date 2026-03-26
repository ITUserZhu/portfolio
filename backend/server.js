require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.disable('x-powered-by');

// 安全 Headers
app.use(helmet());

// CORS 白名单
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:5174', 'http://localhost:3000', 'http://107.173.231.168', 'http://192.168.31.139:5174'];
app.use(cors({
  origin(origin, callback) {
    // 允许无 origin 的请求（如同源请求、curl）
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// 请求体大小限制
app.use(express.json({ limit: '500kb' }));

// 全局速率限制：每个 IP 每 15 分钟最多 200 次请求
app.use('/api', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { status: 'error', message: '请求过于频繁，请稍后再试' },
}));

// 联系表单单独限制：每个 IP 每小时最多 5 次
app.use('/api/contact', rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { status: 'error', message: '提交过于频繁，请稍后再试' },
}));

// 路由
app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);

// 生产环境：托管前端静态文件
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('/{*splat}', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

// 连接数据库后启动服务
connectDB().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ 后端服务已启动: http://localhost:${PORT}`);
  });
});
