const vocabularies = [
  // 日常词汇 - 初级
  {
    word: "hello",
    phonetic: "/həˈloʊ/",
    partOfSpeech: "int.",
    definition: "Used as a greeting or to begin a phone conversation",
    translation: "你好",
    phrases: [
      { phrase: "Hello there!", translation: "你好！" },
      { phrase: "Say hello to someone", translation: "向某人问好" }
    ],
    examples: [
      { sentence: "Hello, how are you today?", translation: "你好，你今天怎么样？" },
      { sentence: "She said hello to everyone at the party.", translation: "她在派对上向每个人问好。" }
    ],
    difficulty: "beginner",
    category: "daily"
  },
  {
    word: "goodbye",
    phonetic: "/ɡʊdˈbaɪ/",
    partOfSpeech: "int.",
    definition: "Used when leaving or parting from someone",
    translation: "再见",
    phrases: [
      { phrase: "Say goodbye", translation: "说再见" },
      { phrase: "Wave goodbye", translation: "挥手告别" }
    ],
    examples: [
      { sentence: "Goodbye, see you tomorrow!", translation: "再见，明天见！" },
      { sentence: "She waved goodbye to her friends.", translation: "她向朋友们挥手告别。" }
    ],
    difficulty: "beginner",
    category: "daily"
  },
  {
    word: "thank",
    phonetic: "/θæŋk/",
    partOfSpeech: "v.",
    definition: "To express gratitude or appreciation to someone",
    translation: "感谢",
    phrases: [
      { phrase: "Thank you", translation: "谢谢你" },
      { phrase: "Thank someone for something", translation: "因某事感谢某人" }
    ],
    examples: [
      { sentence: "Thank you for your help.", translation: "谢谢你的帮助。" },
      { sentence: "I want to thank my parents for their support.", translation: "我想感谢父母的支持。" }
    ],
    difficulty: "beginner",
    category: "daily"
  },
  {
    word: "please",
    phonetic: "/pliːz/",
    partOfSpeech: "adv.",
    definition: "Used to make a polite request or add emphasis",
    translation: "请",
    phrases: [
      { phrase: "Please help me", translation: "请帮助我" },
      { phrase: "If you please", translation: "如果你愿意的话" }
    ],
    examples: [
      { sentence: "Please sit down.", translation: "请坐下。" },
      { sentence: "Could you please open the window?", translation: "你能打开窗户吗？" }
    ],
    difficulty: "beginner",
    category: "daily"
  },
  {
    word: "sorry",
    phonetic: "/ˈsɔːri/",
    partOfSpeech: "adj.",
    definition: "Feeling regret or sympathy; used to apologize",
    translation: "对不起；抱歉",
    phrases: [
      { phrase: "I'm sorry", translation: "我很抱歉" },
      { phrase: "Say sorry", translation: "道歉" }
    ],
    examples: [
      { sentence: "I'm sorry for being late.", translation: "对不起我迟到了。" },
      { sentence: "Sorry to bother you.", translation: "抱歉打扰你。" }
    ],
    difficulty: "beginner",
    category: "daily"
  },
  // 日常词汇 - 中级
  {
    word: "understand",
    phonetic: "/ˌʌndərˈstænd/",
    partOfSpeech: "v.",
    definition: "To comprehend the meaning of something",
    translation: "理解；明白",
    phrases: [
      { phrase: "Understand the problem", translation: "理解问题" },
      { phrase: "Make someone understand", translation: "让某人理解" }
    ],
    examples: [
      { sentence: "I don't understand this question.", translation: "我不理解这个问题。" },
      { sentence: "Do you understand what I mean?", translation: "你明白我的意思吗？" }
    ],
    difficulty: "intermediate",
    category: "daily"
  },
  {
    word: "experience",
    phonetic: "/ɪkˈspɪriəns/",
    partOfSpeech: "n.",
    definition: "Practical contact with and observation of facts or events",
    translation: "经验；经历",
    phrases: [
      { phrase: "Work experience", translation: "工作经验" },
      { phrase: "Learn from experience", translation: "从经验中学习" }
    ],
    examples: [
      { sentence: "This job requires 5 years of experience.", translation: "这份工作需要5年经验。" },
      { sentence: "Traveling abroad was a great experience.", translation: "出国旅行是一次很棒的经历。" }
    ],
    difficulty: "intermediate",
    category: "daily"
  },
  {
    word: "opportunity",
    phonetic: "/ˌɑːpərˈtuːnəti/",
    partOfSpeech: "n.",
    definition: "A set of circumstances that makes it possible to do something",
    translation: "机会",
    phrases: [
      { phrase: "Job opportunity", translation: "工作机会" },
      { phrase: "Take the opportunity", translation: "抓住机会" }
    ],
    examples: [
      { sentence: "This is a great opportunity for you.", translation: "这对你来说是个好机会。" },
      { sentence: "Don't miss this opportunity.", translation: "不要错过这个机会。" }
    ],
    difficulty: "intermediate",
    category: "daily"
  },
  // 技术词汇
  {
    word: "algorithm",
    phonetic: "/ˈælɡərɪðəm/",
    partOfSpeech: "n.",
    definition: "A step-by-step procedure for solving a problem or accomplishing a task",
    translation: "算法",
    phrases: [
      { phrase: "Sorting algorithm", translation: "排序算法" },
      { phrase: "Search algorithm", translation: "搜索算法" }
    ],
    examples: [
      { sentence: "This algorithm is very efficient.", translation: "这个算法非常高效。" },
      { sentence: "We need to optimize the algorithm.", translation: "我们需要优化这个算法。" }
    ],
    difficulty: "advanced",
    category: "tech"
  },
  {
    word: "database",
    phonetic: "/ˈdeɪtəbeɪs/",
    partOfSpeech: "n.",
    definition: "A structured set of data held in a computer",
    translation: "数据库",
    phrases: [
      { phrase: "Database management", translation: "数据库管理" },
      { phrase: "Relational database", translation: "关系型数据库" }
    ],
    examples: [
      { sentence: "The data is stored in a database.", translation: "数据存储在数据库中。" },
      { sentence: "We need to backup the database.", translation: "我们需要备份数据库。" }
    ],
    difficulty: "intermediate",
    category: "tech"
  },
  {
    word: "function",
    phonetic: "/ˈfʌŋkʃn/",
    partOfSpeech: "n.",
    definition: "A reusable block of code that performs a specific task",
    translation: "函数；功能",
    phrases: [
      { phrase: "Call a function", translation: "调用函数" },
      { phrase: "Built-in function", translation: "内置函数" }
    ],
    examples: [
      { sentence: "This function calculates the sum.", translation: "这个函数计算总和。" },
      { sentence: "You need to define the function first.", translation: "你需要先定义这个函数。" }
    ],
    difficulty: "intermediate",
    category: "tech"
  },
  {
    word: "variable",
    phonetic: "/ˈveriəbl/",
    partOfSpeech: "n.",
    definition: "A named storage location in memory that can hold a value",
    translation: "变量",
    phrases: [
      { phrase: "Declare a variable", translation: "声明变量" },
      { phrase: "Global variable", translation: "全局变量" }
    ],
    examples: [
      { sentence: "Store the result in a variable.", translation: "将结果存储在变量中。" },
      { sentence: "This variable is undefined.", translation: "这个变量未定义。" }
    ],
    difficulty: "beginner",
    category: "tech"
  },
  {
    word: "interface",
    phonetic: "/ˈɪntərfeɪs/",
    partOfSpeech: "n.",
    definition: "A point where two systems meet and interact",
    translation: "接口；界面",
    phrases: [
      { phrase: "User interface", translation: "用户界面" },
      { phrase: "Programming interface", translation: "编程接口" }
    ],
    examples: [
      { sentence: "The user interface is very intuitive.", translation: "用户界面非常直观。" },
      { sentence: "We need to design a REST API interface.", translation: "我们需要设计一个REST API接口。" }
    ],
    difficulty: "intermediate",
    category: "tech"
  },
  // 商务词汇
  {
    word: "meeting",
    phonetic: "/ˈmiːtɪŋ/",
    partOfSpeech: "n.",
    definition: "A gathering of people for a particular purpose",
    translation: "会议",
    phrases: [
      { phrase: "Schedule a meeting", translation: "安排会议" },
      { phrase: "Attend a meeting", translation: "参加会议" }
    ],
    examples: [
      { sentence: "We have a meeting at 3 PM.", translation: "我们下午3点有个会议。" },
      { sentence: "The meeting was very productive.", translation: "会议非常有成效。" }
    ],
    difficulty: "beginner",
    category: "business"
  },
  {
    word: "deadline",
    phonetic: "/ˈdedlaɪn/",
    partOfSpeech: "n.",
    definition: "The latest time or date by which something should be completed",
    translation: "截止日期",
    phrases: [
      { phrase: "Meet the deadline", translation: "按时完成" },
      { phrase: "Tight deadline", translation: "紧迫的截止日期" }
    ],
    examples: [
      { sentence: "The deadline is next Friday.", translation: "截止日期是下周五。" },
      { sentence: "We need to meet this deadline.", translation: "我们需要按时完成。" }
    ],
    difficulty: "intermediate",
    category: "business"
  },
  {
    word: "project",
    phonetic: "/ˈprɑːdʒekt/",
    partOfSpeech: "n.",
    definition: "A planned piece of work that has a specific purpose",
    translation: "项目",
    phrases: [
      { phrase: "Start a project", translation: "启动项目" },
      { phrase: "Complete a project", translation: "完成项目" }
    ],
    examples: [
      { sentence: "This project is very important.", translation: "这个项目非常重要。" },
      { sentence: "We need to finish the project on time.", translation: "我们需要按时完成项目。" }
    ],
    difficulty: "beginner",
    category: "business"
  },
  {
    word: "client",
    phonetic: "/ˈklaɪənt/",
    partOfSpeech: "n.",
    definition: "A person or organization using the services of a professional",
    translation: "客户",
    phrases: [
      { phrase: "Client meeting", translation: "客户会议" },
      { phrase: "Satisfy the client", translation: "满足客户需求" }
    ],
    examples: [
      { sentence: "The client is very satisfied with our work.", translation: "客户对我们的工作非常满意。" },
      { sentence: "We need to maintain good relationships with clients.", translation: "我们需要与客户保持良好关系。" }
    ],
    difficulty: "intermediate",
    category: "business"
  },
  // 学术词汇
  {
    word: "research",
    phonetic: "/rɪˈsɜːrtʃ/",
    partOfSpeech: "n.",
    definition: "The systematic investigation into and study of materials and sources",
    translation: "研究",
    phrases: [
      { phrase: "Conduct research", translation: "进行研究" },
      { phrase: "Research methodology", translation: "研究方法" }
    ],
    examples: [
      { sentence: "This research is very important for the field.", translation: "这项研究对该领域非常重要。" },
      { sentence: "We need to do more research.", translation: "我们需要做更多研究。" }
    ],
    difficulty: "intermediate",
    category: "academic"
  },
  {
    word: "analysis",
    phonetic: "/əˈnæləsɪs/",
    partOfSpeech: "n.",
    definition: "Detailed examination of the elements or structure of something",
    translation: "分析",
    phrases: [
      { phrase: "Data analysis", translation: "数据分析" },
      { phrase: "In-depth analysis", translation: "深入分析" }
    ],
    examples: [
      { sentence: "The analysis shows interesting results.", translation: "分析显示了有趣的结果。" },
      { sentence: "We need a thorough analysis of the situation.", translation: "我们需要对情况进行彻底分析。" }
    ],
    difficulty: "intermediate",
    category: "academic"
  },
  {
    word: "hypothesis",
    phonetic: "/haɪˈpɑːθəsɪs/",
    partOfSpeech: "n.",
    definition: "A proposed explanation made on the basis of limited evidence",
    translation: "假设",
    phrases: [
      { phrase: "Test a hypothesis", translation: "验证假设" },
      { phrase: "Form a hypothesis", translation: "形成假设" }
    ],
    examples: [
      { sentence: "Our hypothesis was proven correct.", translation: "我们的假设被证明是正确的。" },
      { sentence: "We need to test this hypothesis.", translation: "我们需要验证这个假设。" }
    ],
    difficulty: "advanced",
    category: "academic"
  },
  // 旅行词汇
  {
    word: "airport",
    phonetic: "/ˈerpɔːrt/",
    partOfSpeech: "n.",
    definition: "A place where aircraft regularly take off and land",
    translation: "机场",
    phrases: [
      { phrase: "At the airport", translation: "在机场" },
      { phrase: "Airport security", translation: "机场安检" }
    ],
    examples: [
      { sentence: "I'll pick you up at the airport.", translation: "我会去机场接你。" },
      { sentence: "We arrived at the airport two hours early.", translation: "我们提前两小时到达机场。" }
    ],
    difficulty: "beginner",
    category: "travel"
  },
  {
    word: "reservation",
    phonetic: "/ˌrezərˈveɪʃn/",
    partOfSpeech: "n.",
    definition: "An arrangement to have something held for one's use",
    translation: "预订；预约",
    phrases: [
      { phrase: "Make a reservation", translation: "预订" },
      { phrase: "Cancel a reservation", translation: "取消预订" }
    ],
    examples: [
      { sentence: "I'd like to make a reservation for two.", translation: "我想预订两个人的位置。" },
      { sentence: "Do you have a reservation?", translation: "你有预订吗？" }
    ],
    difficulty: "intermediate",
    category: "travel"
  },
  {
    word: "luggage",
    phonetic: "/ˈlʌɡɪdʒ/",
    partOfSpeech: "n.",
    definition: "Suitcases or other bags in which to pack personal belongings for traveling",
    translation: "行李",
    phrases: [
      { phrase: "Carry-on luggage", translation: "随身行李" },
      { phrase: "Check luggage", translation: "托运行李" }
    ],
    examples: [
      { sentence: "My luggage is very heavy.", translation: "我的行李很重。" },
      { sentence: "Please check your luggage at the counter.", translation: "请在柜台托运行李。" }
    ],
    difficulty: "beginner",
    category: "travel"
  },
  {
    word: "itinerary",
    phonetic: "/aɪˈtɪnəreri/",
    partOfSpeech: "n.",
    definition: "A planned route or journey",
    translation: "行程；旅行计划",
    phrases: [
      { phrase: "Travel itinerary", translation: "旅行行程" },
      { phrase: "Plan an itinerary", translation: "规划行程" }
    ],
    examples: [
      { sentence: "Here's our itinerary for the trip.", translation: "这是我们的旅行行程。" },
      { sentence: "We need to plan our itinerary carefully.", translation: "我们需要仔细规划行程。" }
    ],
    difficulty: "advanced",
    category: "travel"
  }
];

module.exports = vocabularies;