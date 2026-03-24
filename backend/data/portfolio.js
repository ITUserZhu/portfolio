const profile = {
  name: 'Juleon',
  title: '全栈开发工程师',
  subtitle: 'Full-Stack Developer & Creative Technologist',
  bio: '热衷于用代码创造美好体验的开发者。5年+全栈开发经验，专注于现代Web技术栈，擅长将复杂需求转化为优雅的技术方案。',
  avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Alex&backgroundColor=d4a853',
  location: '中国 · 上海',
  email: '17601399112@163.com',
  github: 'https://github.com/ITUserZhu',
  linkedin: 'https://linkedin.com',
  resume: '/resume.pdf',
  stats: {
    yearsExp: '5+',
    projects: '30+',
    clients: '20+',
    coffee: '∞',
  },
};

const skills = [
  {
    id: 1,
    category: '前端开发',
    icon: '◆',
    items: [
      { name: 'Vue.js', level: 95, color: '#42b883' },
      { name: 'React', level: 85, color: '#61dafb' },
      { name: 'TypeScript', level: 90, color: '#3178c6' },
      { name: 'Tailwind CSS', level: 92, color: '#06b6d4' },
      { name: 'Nuxt.js', level: 80, color: '#00dc82' },
    ],
  },
  {
    id: 2,
    category: '后端开发',
    icon: '▲',
    items: [
      { name: 'Node.js', level: 90, color: '#339933' },
      { name: 'Express', level: 88, color: '#000000' },
      { name: 'Python', level: 78, color: '#3776ab' },
      { name: 'PostgreSQL', level: 82, color: '#4169e1' },
      { name: 'MongoDB', level: 85, color: '#47a248' },
    ],
  },
  {
    id: 3,
    category: '工具 & DevOps',
    icon: '●',
    items: [
      { name: 'Docker', level: 80, color: '#2496ed' },
      { name: 'Git', level: 92, color: '#f05032' },
      { name: 'Linux', level: 85, color: '#fcc624' },
      { name: 'Nginx', level: 78, color: '#009639' },
      { name: 'CI/CD', level: 75, color: '#fc6d26' },
    ],
  },
  {
    id: 4,
    category: '设计 & 其他',
    icon: '■',
    items: [
      { name: 'Figma', level: 75, color: '#f24e1e' },
      { name: 'UI/UX Design', level: 70, color: '#ff6b6b' },
      { name: 'Responsive Design', level: 90, color: '#a855f7' },
      { name: 'SEO', level: 72, color: '#4285f4' },
    ],
  },
];

const projects = [
  {
    id: 1,
    title: '电商管理后台',
    description:
      '全功能电商管理系统，包含商品管理、订单处理、数据分析等模块。使用Vue3 + Element Plus构建，支持权限管理和实时数据看板。',
    tags: ['Vue 3', 'Element Plus', 'Node.js', 'PostgreSQL'],
    image: 'https://picsum.photos/seed/ecommerce/600/400',
    github: 'https://github.com',
    demo: 'https://example.com',
    featured: true,
  },
  {
    id: 2,
    title: '实时协作白板',
    description:
      '基于WebSocket的多人实时协作白板应用，支持画笔、形状、文字等工具，具备历史记录和协作光标显示。',
    tags: ['React', 'WebSocket', 'Canvas API', 'Redis'],
    image: 'https://picsum.photos/seed/whiteboard/600/400',
    github: 'https://github.com',
    demo: 'https://example.com',
    featured: true,
  },
  {
    id: 3,
    title: 'AI 智能助手',
    description:
      '集成大语言模型的智能对话助手，支持多轮对话、上下文理解、代码生成等功能。使用流式响应优化用户体验。',
    tags: ['Vue 3', 'Python', 'FastAPI', 'LLM'],
    image: 'https://picsum.photos/seed/aibot/600/400',
    github: 'https://github.com',
    demo: 'https://example.com',
    featured: true,
  },
  {
    id: 4,
    title: '个人博客系统',
    description:
      '基于Markdown的静态博客系统，支持标签分类、全文搜索、RSS订阅、暗色模式等功能。',
    tags: ['Nuxt.js', 'Markdown', 'Tailwind CSS'],
    image: 'https://picsum.photos/seed/blog/600/400',
    github: 'https://github.com',
    demo: 'https://juleon.site',
    featured: false,
  },
  {
    id: 5,
    title: '数据可视化大屏',
    description:
      '企业级数据可视化大屏，支持多种图表类型、实时数据刷新、自适应布局，可用于监控中心展示。',
    tags: ['Vue 3', 'ECharts', 'WebSocket', 'D3.js'],
    image: 'https://picsum.photos/seed/dashboard/600/400',
    github: 'https://github.com',
    demo: 'https://example.com',
    featured: false,
  },
  {
    id: 6,
    title: '任务管理工具',
    description:
      '类Trello的看板式任务管理工具，支持拖拽排序、标签系统、截止日期提醒和团队协作功能。',
    tags: ['React', 'DnD Kit', 'Express', 'MongoDB'],
    image: 'https://picsum.photos/seed/taskapp/600/400',
    github: 'https://github.com',
    demo: 'https://example.com',
    featured: false,
  },
];

module.exports = { profile, skills, projects };
