# 单词记忆模式设计文档

## 概述
在词汇板块新增"记忆模式"功能，用户可通过翻转卡片 + 手势滑动的方式高效记忆单词。

## 页面流程
词汇页 → 点击"记忆模式"按钮 → 筛选设置（分类/难度/是否排除已掌握）→ 进入记忆页面

## 页面布局（MemoryMode.vue）

### 顶部栏
- 返回按钮（返回词汇页）
- 标题："记忆模式"
- 进度显示：当前第 N 个 / 总数
- 本轮统计：已掌握 x 个、收藏 x 个

### 中部卡片区
翻转卡片，3D 翻转动画（`rotateY(180deg)` + `backface-visibility: hidden`）

**正面：**
- 单词（大号字体）
- 音标 + 发音按钮（复用 useSpeech）
- 词性标签
- 难度/分类标签

**背面：**
- 中文翻译
- 英文释义
- 例句（sentence + translation）
- 常用短语（phrase + translation）

### 底部操作栏
四个按钮（桌面端备选操作）：
- 翻转卡片
- 收藏
- 已掌握
- 下一个

## 手势操作

| 手势 | 动作 | 视觉反馈 |
|------|------|----------|
| 上滑 | 下一个单词 | 卡片向上飞出 |
| 左滑 | 标记已掌握 | 卡片向左飞出 + 绿色提示 |
| 右滑 | 收藏单词 | 卡片向右飞出 + 黄色提示 |
| 点击卡片 | 翻转查看释义 | 3D 翻转动画 |

**手势引导：** 首次进入时显示半透明引导层，用箭头 + 文字说明各方向手势含义，点击任意位置关闭。

## 数据加载策略：分批随机加载
- 后端新增 `GET /api/vocabulary/random-batch?size=30&category=&difficulty=&excludeMastered=true`
- 使用 MongoDB `$sample` 聚合随机抽取
- 前端拿到后打乱顺序，逐个展示
- 当前批次剩余 ≤ 3 个时，预加载下一批

## 文件变更

| 文件 | 操作 | 说明 |
|------|------|------|
| `backend/routes/api.js` | 修改 | 新增 `GET /api/vocabulary/random-batch` 端点 |
| `frontend/src/api/index.js` | 修改 | 新增 `getRandomBatch(params)` |
| `frontend/src/router/index.js` | 修改 | 新增 `/vocabulary/memory` 路由 |
| `frontend/src/views/MemoryMode.vue` | 新建 | 记忆模式页面核心组件 |
| `frontend/src/composables/useSwipe.js` | 新建 | 手势滑动检测 composable |
| `frontend/src/views/VocabularyPage.vue` | 修改 | 添加"记忆模式"入口按钮 |

## 复用现有资源
- `composables/useSpeech.js` — 发音功能
- `api/index.js` 中的 `toggleFavorite()` / `toggleMastered()` — 状态切换
- 现有主题变量（`--ink-*` 系列）
