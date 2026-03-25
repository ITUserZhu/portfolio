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
  },
  {
    "word": "abandon",
    "phonetic": "/əˈbændən/",
    "partOfSpeech": "v.",
    "definition": "To leave a place, thing, or person, usually for ever",
    "translation": "放弃，遗弃",
    "phrases": [
      { "phrase": "abandon hope", "translation": "放弃希望" },
      { "phrase": "abandon oneself to", "translation": "沉溺于" }
    ],
    "examples": [
      { "sentence": "The baby was abandoned by his parents.", "translation": "这个婴儿被父母遗弃了。" },
      { "sentence": "We had to abandon the car in the snow.", "translation": "我们不得不把车遗弃在雪地里。" }
    ],
    "difficulty": "intermediate",
    "category": "academic"
  },
  {
    "word": "ability",
    "phonetic": "/əˈbɪləti/",
    "partOfSpeech": "n.",
    "definition": "The physical or mental power or skill needed to do something",
    "translation": "能力，才干",
    "phrases": [
      { "phrase": "to the best of one's ability", "translation": "竭尽所能" },
      { "phrase": "mixed-ability", "translation": "能力参差不齐的" }
    ],
    "examples": [
      { "sentence": "She has the ability to explain things clearly.", "translation": "她有能力把事情解释得很清楚。" },
      { "sentence": "I have confidence in his ability to succeed.", "translation": "我有信心他能成功。" }
    ],
    "difficulty": "beginner",
    "category": "daily"
  },
  {
    "word": "calculate",
    "phonetic": "/ˈkælkjuleɪt/",
    "partOfSpeech": "v.",
    "definition": "To determine a number or amount by using mathematics",
    "translation": "计算，核算",
    "phrases": [
      { "phrase": "calculate the cost", "translation": "计算成本" },
      { "phrase": "be calculated to", "translation": "旨在；为了" }
    ],
    "examples": [
      { "sentence": "You need to calculate the area of the rectangle.", "translation": "你需要计算长方形的面积。" },
      { "sentence": "We are calculating the risks involved.", "translation": "我们正在评估涉及的风险。" }
    ],
    "difficulty": "intermediate",
    "category": "science"
  },
  {
    "word": "diligent",
    "phonetic": "/ˈdɪlɪdʒənt/",
    "partOfSpeech": "adj.",
    "definition": "Careful and using a lot of effort",
    "translation": "勤奋的，孜孜不倦的",
    "phrases": [
      { "phrase": "a diligent student", "translation": "勤奋的学生" },
      { "phrase": "diligent search", "translation": "细致的搜寻" }
    ],
    "examples": [
      { "sentence": "Leo is a very diligent worker.", "translation": "里奥是个非常勤奋的工人。" },
      { "sentence": "They made diligent efforts to finish on time.", "translation": "他们为了按时完成做出了不懈努力。" }
    ],
    "difficulty": "advanced",
    "category": "personality"
  },
  {
    "word": "efficient",
    "phonetic": "/ɪˈfɪʃnt/",
    "partOfSpeech": "adj.",
    "definition": "Working well and not wasting time or energy",
    "translation": "效率高的，有能力的",
    "phrases": [
      { "phrase": "fuel-efficient", "translation": "节能的，省油的" },
      { "phrase": "efficient service", "translation": "高效的服务" }
    ],
    "examples": [
      { "sentence": "The new system is far more efficient than the old one.", "translation": "新系统比旧系统效率高得多。" },
      { "sentence": "We need an efficient way to store data.", "translation": "我们需要一种高效的数据存储方式。" }
    ],
    "difficulty": "intermediate",
    "category": "work"
  },
  {
    "word": "accept",
    "phonetic": "/əkˈsept/",
    "partOfSpeech": "v.",
    "definition": "To agree to take something or to say yes to an offer",
    "translation": "接受，认可",
    "phrases": [
      { "phrase": "accept an invitation", "translation": "接受邀请" },
      { "phrase": "accept a challenge", "translation": "接受挑战" }
    ],
    "examples": [
      { "sentence": "Please accept this small gift.", "translation": "请收下这份小礼物。" },
      { "sentence": "She decided to accept the job offer.", "translation": "她决定接受这份工作。" }
    ],
    "difficulty": "beginner",
    "category": "daily"
  },
  {
    "word": "address",
    "phonetic": "/ˈædres/",
    "partOfSpeech": "n.",
    "definition": "The number of the house, name of the road, and town where a person lives",
    "translation": "地址，住址",
    "phrases": [
      { "phrase": "email address", "translation": "电子邮箱地址" },
      { "phrase": "home address", "translation": "家庭住址" }
    ],
    "examples": [
      { "sentence": "What is your current address?", "translation": "你现在的住址是什么？" },
      { "sentence": "I'll write down my address for you.", "translation": "我会把我的地址写给你。" }
    ],
    "difficulty": "beginner",
    "category": "info"
  },
  {
    "word": "adult",
    "phonetic": "/ˈædʌlt/",
    "partOfSpeech": "n.",
    "definition": "A person or animal that has grown to full size and strength",
    "translation": "成年人",
    "phrases": [
      { "phrase": "an adult education", "translation": "成人教育" },
      { "phrase": "young adult", "translation": "青少年；年轻人" }
    ],
    "examples": [
      { "sentence": "Adults pay full price, but children are half price.", "translation": "成人付全价，儿童半价。" },
      { "sentence": "The movie is for adults only.", "translation": "这部电影仅限成年人观看。" }
    ],
    "difficulty": "beginner",
    "category": "people"
  },
  {
    "word": "advice",
    "phonetic": "/ədˈvaɪs/",
    "partOfSpeech": "n.",
    "definition": "An opinion or recommendation offered as a guide to action",
    "translation": "建议，忠告",
    "phrases": [
      { "phrase": "a piece of advice", "translation": "一条建议" },
      { "phrase": "ask for advice", "translation": "征求意见" }
    ],
    "examples": [
      { "sentence": "Can you give me some advice on buying a car?", "translation": "你能给我一些买车的建议吗？" },
      { "sentence": "She followed her mother's advice.", "translation": "她听从了母亲的建议。" }
    ],
    "difficulty": "beginner",
    "category": "communication"
  },
  {
    "word": "afraid",
    "phonetic": "/əˈfreɪd/",
    "partOfSpeech": "adj.",
    "definition": "Feeling fear, or feeling worry about the possible results of a particular situation",
    "translation": "害怕的，担心的",
    "phrases": [
      { "phrase": "be afraid of", "translation": "害怕..." },
      { "phrase": "I'm afraid so", "translation": "恐怕是这样" }
    ],
    "examples": [
      { "sentence": "Don't be afraid of the dog; it's very friendly.", "translation": "别怕那只狗，它很友好。" },
      { "sentence": "She is afraid of flying.", "translation": "她害怕坐飞机。" }
    ],
    "difficulty": "beginner",
    "category": "emotion"
  },
  {
    "word": "agree",
    "phonetic": "/əˈɡriː/",
    "partOfSpeech": "v.",
    "definition": "To have the same opinion, or to accept a suggestion or idea",
    "translation": "同意，赞成",
    "phrases": [
      { "phrase": "agree with someone", "translation": "同意某人的看法" },
      { "phrase": "agree to do something", "translation": "同意做某事" }
    ],
    "examples": [
      { "sentence": "I totally agree with you.", "translation": "我完全同意你的看法。" },
      { "sentence": "They finally agreed on a price.", "translation": "他们最终就价格达成了一致。" }
    ],
    "difficulty": "beginner",
    "category": "communication"
  },
  {
    "word": "allow",
    "phonetic": "/əˈlaʊ/",
    "partOfSpeech": "v.",
    "definition": "To give permission for someone to do something",
    "translation": "允许，容许",
    "phrases": [
      { "phrase": "allow somebody to do", "translation": "允许某人做某事" },
      { "phrase": "smoking not allowed", "translation": "禁止吸烟" }
    ],
    "examples": [
      { "sentence": "My parents don't allow me to stay out late.", "translation": "我父母不允许我在外面呆得很晚。" },
      { "sentence": "Please allow me to introduce myself.", "translation": "请允许我自我介绍一下。" }
    ],
    "difficulty": "beginner",
    "category": "daily"
  },
  {
    "word": "always",
    "phonetic": "/ˈɔːlweɪz/",
    "partOfSpeech": "adv.",
    "definition": "At all times; on every occasion",
    "translation": "总是，经常",
    "phrases": [
      { "phrase": "as always", "translation": "一如既往" },
      { "phrase": "not always", "translation": "不总是" }
    ],
    "examples": [
      { "sentence": "I always drink coffee in the morning.", "translation": "我早上总是喝咖啡。" },
      { "sentence": "The sun always rises in the east.", "translation": "太阳总是从东方升起。" }
    ],
    "difficulty": "beginner",
    "category": "time"
  },
  {
    "word": "amount",
    "phonetic": "/əˈmaʊnt/",
    "partOfSpeech": "n.",
    "definition": "A quantity of something such as time, money, or a substance",
    "translation": "数量，金额",
    "phrases": [
      { "phrase": "a large amount of", "translation": "大量的" },
      { "phrase": "total amount", "translation": "总额" }
    ],
    "examples": [
      { "sentence": "They spent a huge amount of money.", "translation": "他们花了一大笔钱。" },
      { "sentence": "The amount of work is increasing.", "translation": "工作量正在增加。" }
    ],
    "difficulty": "beginner",
    "category": "math"
  },
  {
    "word": "angry",
    "phonetic": "/ˈæŋɡri/",
    "partOfSpeech": "adj.",
    "definition": "Feeling or showing strong annoyance, displeasure, or hostility",
    "translation": "生气的，愤怒的",
    "phrases": [
      { "phrase": "get angry", "translation": "生气" },
      { "phrase": "be angry with someone", "translation": "对某人生气" }
    ],
    "examples": [
      { "sentence": "He was very angry with his sister.", "translation": "他对他姐姐很生气。" },
      { "sentence": "Please don't get angry with me.", "translation": "请不要对我生气。" }
    ],
    "difficulty": "beginner",
    "category": "emotion"
  },
  {
    "word": "answer",
    "phonetic": "/ˈænsər/",
    "partOfSpeech": "n./v.",
    "definition": "A reaction to a question, letter, phone call, etc.",
    "translation": "回答，答案",
    "phrases": [
      { "phrase": "answer the phone", "translation": "接电话" },
      { "phrase": "the answer to the question", "translation": "问题的答案" }
    ],
    "examples": [
      { "sentence": "I'm still waiting for an answer to my email.", "translation": "我还在等邮件的回信。" },
      { "sentence": "Can you answer the door?", "translation": "你能去开一下门吗？" }
    ],
    "difficulty": "beginner",
    "category": "communication"
  },
  {
    "word": "arrive",
    "phonetic": "/əˈraɪv/",
    "partOfSpeech": "v.",
    "definition": "To reach a place, especially at the end of a journey",
    "translation": "到达，抵达",
    "phrases": [
      { "phrase": "arrive at the airport", "translation": "到达机场" },
      { "phrase": "arrive in London", "translation": "到达伦敦" }
    ],
    "examples": [
      { "sentence": "The train arrived late.", "translation": "火车晚点了。" },
      { "sentence": "When will the package arrive?", "translation": "包裹什么时候到？" }
    ],
    "difficulty": "beginner",
    "category": "travel"
  },
  {
    "word": "article",
    "phonetic": "/ˈɑːrtɪkl/",
    "partOfSpeech": "n.",
    "definition": "A piece of writing on a particular subject in a newspaper or magazine",
    "translation": "文章，论文",
    "phrases": [
      { "phrase": "newspaper article", "translation": "报纸文章" },
      { "phrase": "a featured article", "translation": "专题文章" }
    ],
    "examples": [
      { "sentence": "I read an interesting article about AI.", "translation": "我读了一篇关于人工智能的有趣文章。" },
      { "sentence": "She wrote an article for the local magazine.", "translation": "她给当地杂志写了一篇文章。" }
    ],
    "difficulty": "beginner",
    "category": "media"
  },
  {
    "word": "attend",
    "phonetic": "/əˈtend/",
    "partOfSpeech": "v.",
    "definition": "To go to an event, place, or meeting",
    "translation": "参加，出席",
    "phrases": [
      { "phrase": "attend a meeting", "translation": "参加会议" },
      { "phrase": "attend school", "translation": "上学" }
    ],
    "examples": [
      { "sentence": "He was unable to attend the wedding.", "translation": "他没能参加婚礼。" },
      { "sentence": "How many people attended the conference?", "translation": "有多少人参加了会议？" }
    ],
    "difficulty": "beginner",
    "category": "education"
  },
  {
    "word": "average",
    "phonetic": "/ˈævərɪdʒ/",
    "partOfSpeech": "adj./n.",
    "definition": "The result you get by adding two or more amounts together and dividing by the number of amounts",
    "translation": "平均的，普通的",
    "phrases": [
      { "phrase": "above average", "translation": "高于平均水平" },
      { "phrase": "on average", "translation": "平均而言" }
    ],
    "examples": [
      { "sentence": "The average age of the students is 20.", "translation": "学生的平均年龄是20岁。" },
      { "sentence": "It was just an average day.", "translation": "那只是平凡的一天。" }
    ],
    "difficulty": "beginner",
    "category": "math"
  },
  {
    "word": "balance",
    "phonetic": "/ˈbæləns/",
    "partOfSpeech": "n./v.",
    "definition": "A state where things are of equal weight or force",
    "translation": "平衡，余额",
    "phrases": [
      { "phrase": "keep one's balance", "translation": "保持平衡" },
      { "phrase": "bank balance", "translation": "银行余额" }
    ],
    "examples": [
      { "sentence": "She lost her balance and fell.", "translation": "她失去平衡摔倒了。" },
      { "sentence": "You need a good balance between work and life.", "translation": "你需要在工作和生活之间保持良好的平衡。" }
    ],
    "difficulty": "beginner",
    "category": "lifestyle"
  },
  {
    "word": "beautiful",
    "phonetic": "/ˈbjuːtɪfl/",
    "partOfSpeech": "adj.",
    "definition": "Pleasant to look at or listen to",
    "translation": "美丽的，漂亮的",
    "phrases": [
      { "phrase": "a beautiful day", "translation": "美好的一天" },
      { "phrase": "beautiful scenery", "translation": "美丽的风景" }
    ],
    "examples": [
      { "sentence": "She is wearing a beautiful dress.", "translation": "她穿着一件漂亮的连衣裙。" },
      { "sentence": "The sunrise was truly beautiful.", "translation": "日出真的很美。" }
    ],
    "difficulty": "beginner",
    "category": "appearance"
  },
  {
    "word": "believe",
    "phonetic": "/bɪˈliːv/",
    "partOfSpeech": "v.",
    "definition": "To think that something is true, correct, or real",
    "translation": "相信，认为",
    "phrases": [
      { "phrase": "believe in yourself", "translation": "相信你自己" },
      { "phrase": "hard to believe", "translation": "难以置信" }
    ],
    "examples": [
      { "sentence": "I believe that you can do it.", "translation": "我相信你能做到。" },
      { "sentence": "Do you believe in ghosts?", "translation": "你相信有鬼吗？" }
    ],
    "difficulty": "beginner",
    "category": "thought"
  },
  {
    "word": "benefit",
    "phonetic": "/ˈbenɪfɪt/",
    "partOfSpeech": "n./v.",
    "definition": "A helpful or good effect, or something intended to help",
    "translation": "利益，好处",
    "phrases": [
      { "phrase": "mutual benefit", "translation": "互惠互利" },
      { "phrase": "benefit from", "translation": "从...中受益" }
    ],
    "examples": [
      { "sentence": "Exercise has many health benefits.", "translation": "运动对健康有很多好处。" },
      { "sentence": "The new law will benefit many people.", "translation": "新法律将使许多人受益。" }
    ],
    "difficulty": "beginner",
    "category": "daily"
  },
  {
    "word": "birthday",
    "phonetic": "/ˈbɜːrθdeɪ/",
    "partOfSpeech": "n.",
    "definition": "The day on which a person was born",
    "translation": "生日",
    "phrases": [
      { "phrase": "Happy Birthday!", "translation": "生日快乐！" },
      { "phrase": "birthday present", "translation": "生日礼物" }
    ],
    "examples": [
      { "sentence": "Today is my 21st birthday.", "translation": "今天是我的21岁生日。" },
      { "sentence": "What do you want for your birthday?", "translation": "你想要什么生日礼物？" }
    ],
    "difficulty": "beginner",
    "category": "daily"
  },
  {
    "word": "borrow",
    "phonetic": "/ˈbɑːroʊ/",
    "partOfSpeech": "v.",
    "definition": "To get or receive something from someone with the intention of giving it back",
    "translation": "借，借入",
    "phrases": [
      { "phrase": "borrow something from somebody", "translation": "从某人那里借某物" },
      { "phrase": "borrow a book", "translation": "借书" }
    ],
    "examples": [
      { "sentence": "Can I borrow your pen for a second?", "translation": "我能借下你的笔吗？" },
      { "sentence": "I borrowed this money from the bank.", "translation": "我从银行借了这笔钱。" }
    ],
    "difficulty": "beginner",
    "category": "daily"
  },
  {
    "word": "bottle",
    "phonetic": "/ˈbɑːtl/",
    "partOfSpeech": "n.",
    "definition": "A container for liquids, usually made of glass or plastic",
    "translation": "瓶子",
    "phrases": [
      { "phrase": "a water bottle", "translation": "水瓶" },
      { "phrase": "bottle opener", "translation": "开瓶器" }
    ],
    "examples": [
      { "sentence": "He drank a whole bottle of water.", "translation": "他喝了一整瓶水。" },
      { "sentence": "The baby is drinking from a bottle.", "translation": "婴儿正在用奶瓶喝奶。" }
    ],
    "difficulty": "beginner",
    "category": "objects"
  },
  {
    "word": "bottom",
    "phonetic": "/ˈbɑːtəm/",
    "partOfSpeech": "n.",
    "definition": "The lowest part of something",
    "translation": "底部，尽头",
    "phrases": [
      { "phrase": "at the bottom of", "translation": "在...底部" },
      { "phrase": "from the bottom of my heart", "translation": "由衷地" }
    ],
    "examples": [
      { "sentence": "The keys are at the bottom of my bag.", "translation": "钥匙在我包的最底下。" },
      { "sentence": "We stayed in a house at the bottom of the hill.", "translation": "我们住在山脚下的一座房子里。" }
    ],
    "difficulty": "beginner",
    "category": "position"
  },
  {
    "word": "breakfast",
    "phonetic": "/ˈbrekfəst/",
    "partOfSpeech": "n.",
    "definition": "The first meal of the day",
    "translation": "早餐",
    "phrases": [
      { "phrase": "have breakfast", "translation": "吃早餐" },
      { "phrase": "breakfast cereal", "translation": "早餐麦片" }
    ],
    "examples": [
      { "sentence": "What did you have for breakfast?", "translation": "你早餐吃了什么？" },
      { "sentence": "Breakfast is the most important meal.", "translation": "早餐是最重要的一餐。" }
    ],
    "difficulty": "beginner",
    "category": "food"
  },
  {
    "word": "bridge",
    "phonetic": "/brɪdʒ/",
    "partOfSpeech": "n.",
    "definition": "A structure built over a river or road",
    "translation": "桥，桥梁",
    "phrases": [
      { "phrase": "build a bridge", "translation": "建一座桥" },
      { "phrase": "London Bridge", "translation": "伦敦桥" }
    ],
    "examples": [
      { "sentence": "We walked across the bridge.", "translation": "我们步行过了桥。" },
      { "sentence": "The Golden Gate Bridge is famous.", "translation": "金门大桥很有名。" }
    ],
    "difficulty": "beginner",
    "category": "place"
  },
  {
    "word": "bright",
    "phonetic": "/braɪt/",
    "partOfSpeech": "adj.",
    "definition": "Full of light, or shining with much light",
    "translation": "明亮的，聪明的",
    "phrases": [
      { "phrase": "bright color", "translation": "鲜艳的颜色" },
      { "phrase": "a bright student", "translation": "聪明的学生" }
    ],
    "examples": [
      { "sentence": "The room is very bright and airy.", "translation": "房间非常明亮通风。" },
      { "sentence": "The stars are very bright tonight.", "translation": "今晚的星星很亮。" }
    ],
    "difficulty": "beginner",
    "category": "daily"
  },
  {
    "word": "broken",
    "phonetic": "/ˈbroʊkən/",
    "partOfSpeech": "adj.",
    "definition": "Damaged and no longer working",
    "translation": "破碎的，坏了的",
    "phrases": [
      { "phrase": "broken heart", "translation": "破碎的心" },
      { "phrase": "a broken window", "translation": "打破的窗户" }
    ],
    "examples": [
      { "sentence": "My phone is broken.", "translation": "我的手机坏了。" },
      { "sentence": "He has a broken leg.", "translation": "他的腿骨折了。" }
    ],
    "difficulty": "beginner",
    "category": "daily"
  },
  {
    "word": "business",
    "phonetic": "/ˈbɪznəs/",
    "partOfSpeech": "n.",
    "definition": "The activity of buying and selling goods and services",
    "translation": "商业，生意，事务",
    "phrases": [
      { "phrase": "on business", "translation": "因公出差" },
      { "phrase": "start a business", "translation": "创业" }
    ],
    "examples": [
      { "sentence": "He is away on business.", "translation": "他出差去了。" },
      { "sentence": "None of your business!", "translation": "不关你的事！" }
    ],
    "difficulty": "beginner",
    "category": "work"
  },
  {
    "word": "camera",
    "phonetic": "/ˈkæmrə/",
    "partOfSpeech": "n.",
    "definition": "A device for taking photographs or making movies",
    "translation": "照相机，摄像机",
    "phrases": [
      { "phrase": "digital camera", "translation": "数码相机" },
      { "phrase": "security camera", "translation": "监控摄像头" }
    ],
    "examples": [
      { "sentence": "Smile for the camera!", "translation": "对着镜头笑一笑！" },
      { "sentence": "I bought a new camera yesterday.", "translation": "我昨天买了一台新相机。" }
    ],
    "difficulty": "beginner",
    "category": "objects"
  },
  {
    "word": "cancel",
    "phonetic": "/ˈkænsl/",
    "partOfSpeech": "v.",
    "definition": "To decide that an organized event will not happen",
    "translation": "取消",
    "phrases": [
      { "phrase": "cancel a flight", "translation": "取消航班" },
      { "phrase": "cancel an appointment", "translation": "取消预约" }
    ],
    "examples": [
      { "sentence": "The match was cancelled because of rain.", "translation": "比赛因下雨取消了。" },
      { "sentence": "I need to cancel my subscription.", "translation": "我需要取消我的订阅。" }
    ],
    "difficulty": "beginner",
    "category": "daily"
  },
  {
    "word": "capital",
    "phonetic": "/ˈkæpɪtl/",
    "partOfSpeech": "n.",
    "definition": "The most important city of a country, usually where the government is",
    "translation": "首都，大写字母，资本",
    "phrases": [
      { "phrase": "capital city", "translation": "首都" },
      { "phrase": "capital letters", "translation": "大写字母" }
    ],
    "examples": [
      { "sentence": "Paris is the capital of France.", "translation": "巴黎是法国的首都。" },
      { "sentence": "Write your name in block capitals.", "translation": "请用大写字母填写你的名字。" }
    ],
    "difficulty": "beginner",
    "category": "geography"
  },
  {
    "word": "careful",
    "phonetic": "/ˈkerfl/",
    "partOfSpeech": "adj.",
    "definition": "Giving a lot of attention to what you are doing so that you do not have an accident or make a mistake",
    "translation": "小心的，仔细的",
    "phrases": [
      { "phrase": "be careful with", "translation": "小心使用..." },
      { "phrase": "careful consideration", "translation": "仔细考虑" }
    ],
    "examples": [
      { "sentence": "Be careful with that glass!", "translation": "当心那个玻璃杯！" },
      { "sentence": "She is a very careful driver.", "translation": "她是个非常谨慎的司机。" }
    ],
    "difficulty": "beginner",
    "category": "personality"
  },
  {
    "word": "celebrate",
    "phonetic": "/ˈselɪbreɪt/",
    "partOfSpeech": "v.",
    "definition": "To take part in special enjoyable activities in order to show that a particular occasion is important",
    "translation": "庆祝",
    "phrases": [
      { "phrase": "celebrate a victory", "translation": "庆祝胜利" },
      { "phrase": "celebrate New Year", "translation": "庆新年" }
    ],
    "examples": [
      { "sentence": "How do you celebrate Christmas in your country?", "translation": "在你们国家你们怎么庆祝圣诞节？" },
      { "sentence": "We had a party to celebrate his success.", "translation": "我们开了一个派对来庆祝他的成功。" }
    ],
    "difficulty": "beginner",
    "category": "daily"
  },
  {
    "word": "century",
    "phonetic": "/ˈsentʃəri/",
    "partOfSpeech": "n.",
    "definition": "A period of 100 years",
    "translation": "世纪，百年",
    "phrases": [
      { "phrase": "the 21st century", "translation": "21世纪" },
      { "phrase": "turn of the century", "translation": "世纪之交" }
    ],
    "examples": [
      { "sentence": "This castle was built in the 15th century.", "translation": "这座城堡建于15世纪。" },
      { "sentence": "The city has changed a lot over the last century.", "translation": "在过去的一个世纪里，这个城市发生了很大变化。" }
    ],
    "difficulty": "beginner",
    "category": "time"
  },
  {
    "word": "certain",
    "phonetic": "/ˈsɜːrtn/",
    "partOfSpeech": "adj.",
    "definition": "Having no doubt or knowing exactly that something is true",
    "translation": "确定的，肯定的",
    "phrases": [
      { "phrase": "for certain", "translation": "肯定地，确切地" },
      { "phrase": "make certain", "translation": "弄清楚，确保" }
    ],
    "examples": [
      { "sentence": "Are you certain about that?", "translation": "你对那件事确定吗？" },
      { "sentence": "I'm not certain how it works.", "translation": "我不确定它是如何运作的。" }
    ],
    "difficulty": "beginner",
    "category": "thought"
  },
  {
    "word": "chance",
    "phonetic": "/tʃæns/",
    "partOfSpeech": "n.",
    "definition": "An occasion that allows something to happen; an opportunity",
    "translation": "机会，可能性",
    "phrases": [
      { "phrase": "by chance", "translation": "偶然地" },
      { "phrase": "take a chance", "translation": "碰运气，冒险" }
    ],
    "examples": [
      { "sentence": "I missed the chance to see her.", "translation": "我错过了见她的机会。" },
      { "sentence": "Give me one more chance.", "translation": "再给我一次机会。" }
    ],
    "difficulty": "beginner",
    "category": "daily"
  },
  {
    "word": "change",
    "phonetic": "/tʃeɪndʒ/",
    "partOfSpeech": "v./n.",
    "definition": "To make or become different",
    "translation": "改变，变化，零钱",
    "phrases": [
      { "phrase": "change one's mind", "translation": "改变主意" },
      { "phrase": "small change", "translation": "零钱" }
    ],
    "examples": [
      { "sentence": "The weather is starting to change.", "translation": "天气开始变化了。" },
      { "sentence": "I need to change my clothes.", "translation": "我需要换衣服。" }
    ],
    "difficulty": "beginner",
    "category": "daily"
  },
  {
    "word": "cheap",
    "phonetic": "/tʃiːp/",
    "partOfSpeech": "adj.",
    "definition": "Costing little money or less than is usual or expected",
    "translation": "便宜的，廉价的",
    "phrases": [
      { "phrase": "cheap and cheerful", "translation": "物美价廉" },
      { "phrase": "dirt cheap", "translation": "极其便宜" }
    ],
    "examples": [
      { "sentence": "Food is relatively cheap in this supermarket.", "translation": "这家超市的食物相对便宜。" },
      { "sentence": "I'm looking for a cheap flight.", "translation": "我正在找特价机票。" }
    ],
    "difficulty": "beginner",
    "category": "daily"
  },
  {
    "word": "choose",
    "phonetic": "/tʃuːz/",
    "partOfSpeech": "v.",
    "definition": "To decide what you want from two or more things or possibilities",
    "translation": "选择，决定",
    "phrases": [
      { "phrase": "choose between", "translation": "在...之间选择" },
      { "phrase": "nothing to choose between them", "translation": "两者不分伯仲" }
    ],
    "examples": [
      { "sentence": "You can choose any color you like.", "translation": "你可以选择任何你喜欢的颜色。" },
      { "sentence": "I had to choose between my career and my family.", "translation": "我不得不在事业和家庭之间做出选择。" }
    ],
    "difficulty": "beginner",
    "category": "daily"
  },
  {
    "word": "church",
    "phonetic": "/tʃɜːrtʃ/",
    "partOfSpeech": "n.",
    "definition": "A building for Christian religious activities",
    "translation": "教堂",
    "phrases": [
      { "phrase": "go to church", "translation": "去教堂（做礼拜）" },
      { "phrase": "church service", "translation": "教堂仪式" }
    ],
    "examples": [
      { "sentence": "They go to church every Sunday.", "translation": "他们每个星期天都去教堂。" },
      { "sentence": "The church was built 200 years ago.", "translation": "这座教堂是200年前建的。" }
    ],
    "difficulty": "beginner",
    "category": "place"
  },
  {
    "word": "clever",
    "phonetic": "/ˈklevər/",
    "partOfSpeech": "adj.",
    "definition": "Having or showing the ability to learn and understand things quickly and easily",
    "translation": "聪明的，机灵的",
    "phrases": [
      { "phrase": "a clever idea", "translation": "好主意" },
      { "phrase": "clever at something", "translation": "擅长某事" }
    ],
    "examples": [
      { "sentence": "Fiona is very clever with her hands.", "translation": "菲奥娜手很巧。" },
      { "sentence": "That was a clever solution to the problem.", "translation": "那是解决该问题的一个聪明办法。" }
    ],
    "difficulty": "beginner",
    "category": "personality"
  },
  {
    "word": "climate",
    "phonetic": "/ˈklaɪmət/",
    "partOfSpeech": "n.",
    "definition": "The general weather conditions usually found in a particular place",
    "translation": "气候",
    "phrases": [
      { "phrase": "climate change", "translation": "气候变化" },
      { "phrase": "tropical climate", "translation": "热带气候" }
    ],
    "examples": [
      { "sentence": "The Mediterranean climate is good for growing grapes.", "translation": "地中海气候适合种植葡萄。" },
      { "sentence": "We are facing a global climate crisis.", "translation": "我们正面临全球气候危机。" }
    ],
    "difficulty": "beginner",
    "category": "environment"
  },
  {
    "word": "clothes",
    "phonetic": "/kloʊðz/",
    "partOfSpeech": "n.",
    "definition": "Things such as shirts, trousers, and dresses that you wear on your body",
    "translation": "衣服，服装",
    "phrases": [
      { "phrase": "casual clothes", "translation": "便服" },
      { "phrase": "a change of clothes", "translation": "换洗衣服" }
    ],
    "examples": [
      { "sentence": "She was wearing her best clothes.", "translation": "她穿着最好的衣服。" },
      { "sentence": "I need to pack some warm clothes.", "translation": "我需要带一些保暖的衣服。" }
    ],
    "difficulty": "beginner",
    "category": "daily"
  },
  {
    "word": "collect",
    "phonetic": "/kəˈlekt/",
    "partOfSpeech": "v.",
    "definition": "To bring something together from different places or over a period of time",
    "translation": "收集，搜集",
    "phrases": [
      { "phrase": "collect stamps", "translation": "集邮" },
      { "phrase": "collect data", "translation": "收集数据" }
    ],
    "examples": [
      { "sentence": "I like to collect old coins.", "translation": "我喜欢收集古币。" },
      { "sentence": "The scientist is collecting information for his research.", "translation": "科学家正在为他的研究收集信息。" }
    ],
    "difficulty": "beginner",
    "category": "daily"
  },
  {
    "word": "comfortable",
    "phonetic": "/ˈkʌmftəbl/",
    "partOfSpeech": "adj.",
    "definition": "Providing physical ease and relaxation",
    "translation": "舒适的，舒服的",
    "phrases": [
      { "phrase": "make yourself comfortable", "translation": "请自便/坐得舒服点" },
      { "phrase": "a comfortable chair", "translation": "一把舒服的椅子" }
    ],
    "examples": [
      { "sentence": "Are you comfortable in that chair?", "translation": "你坐在那把椅子里舒服吗？" },
      { "sentence": "These shoes are very comfortable.", "translation": "这些鞋子很舒服。" }
    ],
    "difficulty": "beginner",
    "category": "daily"
  },
  {
    "word": "common",
    "phonetic": "/ˈkɑːmən/",
    "partOfSpeech": "adj.",
    "definition": "Happening often or existing in large numbers",
    "translation": "常见的，普通的，公共的",
    "phrases": [
      { "phrase": "in common", "translation": "共有，共同点" },
      { "phrase": "common sense", "translation": "常识" }
    ],
    "examples": [
      { "sentence": "Colds are very common in winter.", "translation": "感冒在冬天很常见。" },
      { "sentence": "We have a lot in common.", "translation": "我们有很多共同点。" }
    ],
    "difficulty": "beginner",
    "category": "daily"
  },
  {
    "word": "compare",
    "phonetic": "/kəmˈper/",
    "partOfSpeech": "v.",
    "definition": "To examine or look for the difference between two or more things",
    "translation": "比较，对比",
    "phrases": [
      { "phrase": "compare A with B", "translation": "将A与B比较" },
      { "phrase": "compare to", "translation": "比作，比拟" }
    ],
    "examples": [
      { "sentence": "If you compare the two cars, you'll see the difference.", "translation": "如果你对比这两辆车，你就会看出区别。" },
      { "sentence": "Life is often compared to a journey.", "translation": "人生常被比作旅程。" }
    ],
    "difficulty": "beginner",
    "category": "thought"
  },
  {
    "word": "complain",
    "phonetic": "/kəmˈpleɪn/",
    "partOfSpeech": "v.",
    "definition": "To say that something is wrong or not satisfactory",
    "translation": "投诉，抱怨",
    "phrases": [
      { "phrase": "complain about", "translation": "抱怨关于..." },
      { "phrase": "complain to someone", "translation": "向某人投诉" }
    ],
    "examples": [
      { "sentence": "He's always complaining about the weather.", "translation": "他总是抱怨天气。" },
      { "sentence": "If you are unhappy with the service, you should complain.", "translation": "如果你对服务不满意，你应该投诉。" }
    ],
    "difficulty": "beginner",
    "category": "communication"
  },
  {
    "word": "condition",
    "phonetic": "/kənˈdɪʃn/",
    "partOfSpeech": "n.",
    "definition": "The particular state that something or someone is in",
    "translation": "条件，状况",
    "phrases": [
      { "phrase": "in good condition", "translation": "状况良好" },
      { "phrase": "on condition that", "translation": "在...条件下" }
    ],
    "examples": [
      { "sentence": "The car is in excellent condition.", "translation": "这辆车的状况非常好。" },
      { "sentence": "Working conditions here are very poor.", "translation": "这里的办公条件很差。" }
    ],
    "difficulty": "beginner",
    "category": "daily"
  },
  {
    "word": "continue",
    "phonetic": "/kənˈtɪnjuː/",
    "partOfSpeech": "v.",
    "definition": "To keep happening, or to keep doing something",
    "translation": "继续，持续",
    "phrases": [
      { "phrase": "continue to do", "translation": "继续做某事" },
      { "phrase": "to be continued", "translation": "未完待续" }
    ],
    "examples": [
      { "sentence": "Please continue with your work.", "translation": "请继续你的工作。" },
      { "sentence": "The rain continued all day.", "translation": "雨下了一整天。" }
    ],
    "difficulty": "beginner",
    "category": "daily"
  },
  {
    "word": "control",
    "phonetic": "/kənˈtroʊl/",
    "partOfSpeech": "v./n.",
    "definition": "To order, limit, or rule something, or someone's actions or behaviour",
    "translation": "控制，操纵",
    "phrases": [
      { "phrase": "under control", "translation": "处于控制之下" },
      { "phrase": "remote control", "translation": "遥控器" }
    ],
    "examples": [
      { "sentence": "The fire is now under control.", "translation": "火势现在已得到控制。" },
      { "sentence": "You need to learn to control your temper.", "translation": "你需要学会控制你的脾气。" }
    ],
    "difficulty": "beginner",
    "category": "daily"
  },
  {
    "word": "cook",
    "phonetic": "/kʊk/",
    "partOfSpeech": "v./n.",
    "definition": "To prepare food by heating it",
    "translation": "烹调，厨师",
    "phrases": [
      { "phrase": "home-cooked", "translation": "家里做的" },
      { "phrase": "cook dinner", "translation": "做晚饭" }
    ],
    "examples": [
      { "sentence": "My father is a great cook.", "translation": "我父亲是个很棒的厨师。" },
      { "sentence": "Who is going to cook tonight?", "translation": "今晚谁来做饭？" }
    ],
    "difficulty": "beginner",
    "category": "food"
  },
  {
    "word": "corner",
    "phonetic": "/ˈkɔːrnər/",
    "partOfSpeech": "n.",
    "definition": "The point, area, or line where two surfaces or lines meet",
    "translation": "角落，拐角",
    "phrases": [
      { "phrase": "around the corner", "translation": "在拐角处；即将发生" },
      { "phrase": "street corner", "translation": "街角" }
    ],
    "examples": [
      { "sentence": "The shop is on the corner of the street.", "translation": "商店在街道的拐角处。" },
      { "sentence": "He sat in the corner of the room.", "translation": "他坐在房间的角落里。" }
    ],
    "difficulty": "beginner",
    "category": "place"
  },
  {
    "word": "correct",
    "phonetic": "/kəˈrekt/",
    "partOfSpeech": "adj./v.",
    "definition": "In agreement with the true facts or with what is generally accepted",
    "translation": "正确的，修改",
    "phrases": [
      { "phrase": "correct answer", "translation": "正确答案" },
      { "phrase": "politically correct", "translation": "政治正确的" }
    ],
    "examples": [
      { "sentence": "Is that the correct time?", "translation": "时间准吗？" },
      { "sentence": "Please correct any mistakes you find.", "translation": "请纠正你发现的任何错误。" }
    ],
    "difficulty": "beginner",
    "category": "daily"
  },
  {
    "word": "cost",
    "phonetic": "/kɔːst/",
    "partOfSpeech": "n./v.",
    "definition": "The amount of money needed to buy, do, or make something",
    "translation": "成本，价值，花费",
    "phrases": [
      { "phrase": "at all costs", "translation": "不惜任何代价" },
      { "phrase": "cost of living", "translation": "生活成本" }
    ],
    "examples": [
      { "sentence": "How much does this book cost?", "translation": "这本书多少钱？" },
      { "sentence": "The cost of the repair was very high.", "translation": "修理费很高。" }
    ],
    "difficulty": "beginner",
    "category": "money"
  },
  {
    "word": "country",
    "phonetic": "/ˈkʌntri/",
    "partOfSpeech": "n.",
    "definition": "An area of land that has its own government, army, etc.",
    "translation": "国家，乡下",
    "phrases": [
      { "phrase": "country music", "translation": "乡村音乐" },
      { "phrase": "foreign country", "translation": "外国" }
    ],
    "examples": [
      { "sentence": "Which country are you from?", "translation": "你来自哪个国家？" },
      { "sentence": "We live in the country.", "translation": "我们住在乡下。" }
    ],
    "difficulty": "beginner",
    "category": "geography"
  },
  {
    "word": "course",
    "phonetic": "/kɔːrs/",
    "partOfSpeech": "n.",
    "definition": "A set of classes or a plan of study on a particular subject",
    "translation": "课程，过程，航向",
    "phrases": [
      { "phrase": "of course", "translation": "当然" },
      { "phrase": "English course", "translation": "英语课程" }
    ],
    "examples": [
      { "sentence": "I'm taking a course in photography.", "translation": "我正在修摄影课。" },
      { "sentence": "The ship changed its course.", "translation": "船改变了航向。" }
    ],
    "difficulty": "beginner",
    "category": "education"
  },
  {
    "word": "cover",
    "phonetic": "/ˈkʌvər/",
    "partOfSpeech": "v./n.",
    "definition": "To put something over something else",
    "translation": "覆盖，封面",
    "phrases": [
      { "phrase": "under cover", "translation": "在掩护下" },
      { "phrase": "book cover", "translation": "书的封面" }
    ],
    "examples": [
      { "sentence": "Snow covered the ground.", "translation": "雪覆盖了大地。" },
      { "sentence": "I'll cover for you while you're away.", "translation": "你不在的时候我替你顶一下。" }
    ],
    "difficulty": "beginner",
    "category": "daily"
  },
  {
    "word": "create",
    "phonetic": "/kriˈeɪt/",
    "partOfSpeech": "v.",
    "definition": "To make something new, or to cause something to happen",
    "translation": "创造，创建",
    "phrases": [
      { "phrase": "create jobs", "translation": "创造就业机会" },
      { "phrase": "create a profile", "translation": "建立档案" }
    ],
    "examples": [
      { "sentence": "He created a beautiful painting.", "translation": "他创作了一幅美丽的画。" },
      { "sentence": "Technology creates new possibilities.", "translation": "技术创造了新的可能性。" }
    ],
    "difficulty": "beginner",
    "category": "daily"
  },
  {
    "word": "crowded",
    "phonetic": "/ˈkraʊdɪd/",
    "partOfSpeech": "adj.",
    "definition": "Full of people",
    "translation": "拥挤的",
    "phrases": [
      { "phrase": "a crowded bus", "translation": "拥挤的公交车" },
      { "phrase": "over-crowded", "translation": "过度拥挤的" }
    ],
    "examples": [
      { "sentence": "The train was very crowded.", "translation": "火车非常拥挤。" },
      { "sentence": "This street is always crowded at night.", "translation": "这条街晚上总是很拥挤。" }
    ],
    "difficulty": "beginner",
    "category": "daily"
  },
  {
    "word": "culture",
    "phonetic": "/ˈkʌltʃər/",
    "partOfSpeech": "n.",
    "definition": "The way of life, especially the general customs and beliefs, of a particular group of people",
    "translation": "文化，修养",
    "phrases": [
      { "phrase": "pop culture", "translation": "流行文化" },
      { "phrase": "culture shock", "translation": "文化冲击" }
    ],
    "examples": [
      { "sentence": "I love learning about different cultures.", "translation": "我喜欢了解不同的文化。" },
      { "sentence": "Japan has a rich culture.", "translation": "日本有丰富的文化。" }
    ],
    "difficulty": "beginner",
    "category": "society"
  },
  {
    "word": "customer",
    "phonetic": "/ˈkʌstəmər/",
    "partOfSpeech": "n.",
    "definition": "A person who buys goods or services from a shop or business",
    "translation": "顾客，客户",
    "phrases": [
      { "phrase": "regular customer", "translation": "老客户" },
      { "phrase": "customer service", "translation": "客户服务" }
    ],
    "examples": [
      { "sentence": "The shop was full of customers.", "translation": "商店里挤满了顾客。" },
      { "sentence": "Our goal is customer satisfaction.", "translation": "我们的目标是让客户满意。" }
    ],
    "difficulty": "beginner",
    "category": "business"
  },
  {
    "word": "damage",
    "phonetic": "/ˈdæmɪdʒ/",
    "partOfSpeech": "n./v.",
    "definition": "To harm or spoil something",
    "translation": "损害，破坏",
    "phrases": [
      { "phrase": "severe damage", "translation": "严重的损坏" },
      { "phrase": "brain damage", "translation": "脑部损伤" }
    ],
    "examples": [
      { "sentence": "The storm caused a lot of damage.", "translation": "风暴造成了很大损失。" },
      { "sentence": "Smoking can damage your lungs.", "translation": "吸烟会损害你的肺。" }
    ],
    "difficulty": "beginner",
    "category": "daily"
  },
  {
    "word": "dance",
    "phonetic": "/dæns/",
    "partOfSpeech": "v./n.",
    "definition": "To move the body and feet to music",
    "translation": "跳舞，舞蹈",
    "phrases": [
      { "phrase": "go dancing", "translation": "去跳舞" },
      { "phrase": "dance floor", "translation": "舞池" }
    ],
    "examples": [
      { "sentence": "Would you like to dance?", "translation": "你愿意跳支舞吗？" },
      { "sentence": "They danced all night.", "translation": "他们跳了一整夜的舞。" }
    ],
    "difficulty": "beginner",
    "category": "daily"
  },
  {
    "word": "dangerous",
    "phonetic": "/ˈdeɪndʒərəs/",
    "partOfSpeech": "adj.",
    "definition": "Something that could harm you",
    "translation": "危险的",
    "phrases": [
      { "phrase": "a dangerous person", "translation": "一个危险的人物" },
      { "phrase": "dangerous driving", "translation": "危险驾驶" }
    ],
    "examples": [
      { "sentence": "It's dangerous to walk alone at night.", "translation": "晚上一个人走路很危险。" },
      { "sentence": "Is it dangerous to swim here?", "translation": "在这里游泳危险吗？" }
    ],
    "difficulty": "beginner",
    "category": "daily"
  },
  {
    "word": "daughter",
    "phonetic": "/ˈdɔːtər/",
    "partOfSpeech": "n.",
    "definition": "A female child in relation to her parents",
    "translation": "女儿",
    "phrases": [
      { "phrase": "only daughter", "translation": "独生女" },
      { "phrase": "mother and daughter", "translation": "母女" }
    ],
    "examples": [
      { "sentence": "She has two sons and one daughter.", "translation": "她有两个儿子一个女儿。" },
      { "sentence": "My daughter is six years old.", "translation": "我的女儿六岁了。" }
    ],
    "difficulty": "beginner",
    "category": "family"
  },
  {
    "word": "decide",
    "phonetic": "/dɪˈsaɪd/",
    "partOfSpeech": "v.",
    "definition": "To choose something after thinking about several possibilities",
    "translation": "决定，下决心",
    "phrases": [
      { "phrase": "decide to do", "translation": "决定做..." },
      { "phrase": "decide on something", "translation": "选定某物" }
    ],
    "examples": [
      { "sentence": "I can't decide what to wear.", "translation": "我决定不下来穿什么。" },
      { "sentence": "They decided to go abroad.", "translation": "他们决定出国。" }
    ],
    "difficulty": "beginner",
    "category": "thought"
  },
  {
    "word": "degree",
    "phonetic": "/dɪˈɡriː/",
    "partOfSpeech": "n.",
    "definition": "A unit for measuring temperature or angles; a qualification given by a university",
    "translation": "度数，学位",
    "phrases": [
      { "phrase": "university degree", "translation": "大学学位" },
      { "phrase": "by degrees", "translation": "逐渐地" }
    ],
    "examples": [
      { "sentence": "The temperature dropped to zero degrees.", "translation": "温度降到了零度。" },
      { "sentence": "She has a master's degree in law.", "translation": "她有法律硕士学位。" }
    ],
    "difficulty": "beginner",
    "category": "education"
  },
  {
    "word": "delicious",
    "phonetic": "/dɪˈlɪʃəs/",
    "partOfSpeech": "adj.",
    "definition": "Having a very pleasant taste or smell",
    "translation": "美味的，芬芳的",
    "phrases": [
      { "phrase": "a delicious meal", "translation": "一顿美餐" },
      { "phrase": "look delicious", "translation": "看起来很好吃" }
    ],
    "examples": [
      { "sentence": "This cake is absolutely delicious.", "translation": "这个蛋糕绝对美味。" },
      { "sentence": "The soup smells delicious.", "translation": "汤闻起来很香。" }
    ],
    "difficulty": "beginner",
    "category": "food"
  },
  {
    "word": "depend",
    "phonetic": "/dɪˈpend/",
    "partOfSpeech": "v.",
    "definition": "To be decided by or to rely on something",
    "translation": "依靠，取决于",
    "phrases": [
      { "phrase": "depend on", "translation": "取决于；依靠" },
      { "phrase": "it depends", "translation": "视情况而定" }
    ],
    "examples": [
      { "sentence": "Success depends on hard work.", "translation": "成功取决于努力。" },
      { "sentence": "You can always depend on her.", "translation": "你总是可以信赖她。" }
    ],
    "difficulty": "beginner",
    "category": "daily"
  },
  {
    "word": "describe",
    "phonetic": "/dɪˈskraɪb/",
    "partOfSpeech": "v.",
    "definition": "To say or write what someone or something is like",
    "translation": "描述，形容",
    "phrases": [
      { "phrase": "describe as", "translation": "描述为" },
      { "phrase": "beyond description", "translation": "难以形容" }
    ],
    "examples": [
      { "sentence": "Can you describe the person you saw?", "translation": "你能描述一下你看到的那个人的样子吗？" },
      { "sentence": "The man was described as being tall and thin.", "translation": "那个男人被描述成又高又瘦。" }
    ],
    "difficulty": "beginner",
    "category": "communication"
  },
  {
    "word": "design",
    "phonetic": "/dɪˈzaɪn/",
    "partOfSpeech": "v./n.",
    "definition": "To make or draw plans for something, for example clothes or buildings",
    "translation": "设计",
    "phrases": [
      { "phrase": "graphic design", "translation": "平面设计" },
      { "phrase": "by design", "translation": "故意地" }
    ],
    "examples": [
      { "sentence": "She designs her own clothes.", "translation": "她设计自己的衣服。" },
      { "sentence": "This building has a modern design.", "translation": "这座建筑具有现代化的设计。" }
    ],
    "difficulty": "beginner",
    "category": "work"
  },
  {
    "word": "dictionary",
    "phonetic": "/ˈdɪkʃəneri/",
    "partOfSpeech": "n.",
    "definition": "A book that contains a list of words and explains what they mean",
    "translation": "字典，词典",
    "phrases": [
      { "phrase": "look up in a dictionary", "translation": "在词典中查阅" },
      { "phrase": "online dictionary", "translation": "在线词典" }
    ],
    "examples": [
      { "sentence": "If you don't know the word, look it up in a dictionary.", "translation": "如果你不认识这个词，查一下词典。" },
      { "sentence": "I bought an English-Chinese dictionary.", "translation": "我买了一本英汉词典。" }
    ],
    "difficulty": "beginner",
    "category": "education"
  },
  {
    "word": "difficult",
    "phonetic": "/ˈdɪfɪkəlt/",
    "partOfSpeech": "adj.",
    "definition": "Not easy; needing skill or effort to do or understand",
    "translation": "困难的",
    "phrases": [
      { "phrase": "find it difficult to", "translation": "觉得...很难" },
      { "phrase": "difficult times", "translation": "艰难时期" }
    ],
    "examples": [
      { "sentence": "The exam was very difficult.", "translation": "考试非常难。" },
      { "sentence": "It is difficult to change old habits.", "translation": "改变旧习惯很难。" }
    ],
    "difficulty": "beginner",
    "category": "daily"
  },
  {
    "word": "dinner",
    "phonetic": "/ˈdɪnər/",
    "partOfSpeech": "n.",
    "definition": "The main meal of the day, usually eaten in the evening",
    "translation": "晚餐，正餐",
    "phrases": [
      { "phrase": "have dinner", "translation": "吃晚饭" },
      { "phrase": "dinner party", "translation": "晚宴" }
    ],
    "examples": [
      { "sentence": "What's for dinner?", "translation": "晚饭吃什么？" },
      { "sentence": "We invited them to dinner.", "translation": "我们请他们吃晚饭。" }
    ],
    "difficulty": "beginner",
    "category": "food"
  },
  {
    "word": "direction",
    "phonetic": "/dəˈrekʃn/",
    "partOfSpeech": "n.",
    "definition": "The way that someone or something is moving or pointing",
    "translation": "方向，指导",
    "phrases": [
      { "phrase": "in the right direction", "translation": "朝正确的方向" },
      { "phrase": "give directions", "translation": "指路" }
    ],
    "examples": [
      { "sentence": "Which direction are you going in?", "translation": "你往哪个方向走？" },
      { "sentence": "The sign points in the opposite direction.", "translation": "那个路标指向相反的方向。" }
    ],
    "difficulty": "beginner",
    "category": "position"
  },
  {
    "word": "dirty",
    "phonetic": "/ˈdɜːrti/",
    "partOfSpeech": "adj.",
    "definition": "Not clean",
    "translation": "脏的",
    "phrases": [
      { "phrase": "dirty laundry", "translation": "脏衣服" },
      { "phrase": "get dirty", "translation": "变脏" }
    ],
    "examples": [
      { "sentence": "Don't put your dirty shoes on the carpet.", "translation": "别把脏鞋子放在地毯上。" },
      { "sentence": "My hands are dirty.", "translation": "我的手很脏。" }
    ],
    "difficulty": "beginner",
    "category": "daily"
  },
  {
    "word": "discover",
    "phonetic": "/dɪˈskʌvər/",
    "partOfSpeech": "v.",
    "definition": "To find information, a place, or an object, especially for the first time",
    "translation": "发现",
    "phrases": [
      { "phrase": "discover a secret", "translation": "发现秘密" },
      { "phrase": "discover gold", "translation": "发现黄金" }
    ],
    "examples": [
      { "sentence": "Columbus discovered America in 1492.", "translation": "哥伦布在1492年发现了美洲。" },
      { "sentence": "Scientists have discovered a new planet.", "translation": "科学家们发现了一颗新行星。" }
    ],
    "difficulty": "beginner",
    "category": "science"
  },
  {
    "word": "discuss",
    "phonetic": "/dɪˈskʌs/",
    "partOfSpeech": "v.",
    "definition": "To talk about something with other people",
    "translation": "讨论",
    "phrases": [
      { "phrase": "discuss a plan", "translation": "讨论计划" },
      { "phrase": "discuss with somebody", "translation": "与某人讨论" }
    ],
    "examples": [
      { "sentence": "I need to discuss this with my boss.", "translation": "我需要和我老板讨论这件事。" },
      { "sentence": "We discussed the problem for hours.", "translation": "我们讨论这个问题好几个小时了。" }
    ],
    "difficulty": "beginner",
    "category": "communication"
  },
  {
    "word": "distance",
    "phonetic": "/ˈdɪstəns/",
    "partOfSpeech": "n.",
    "definition": "The amount of space between two places",
    "translation": "距离",
    "phrases": [
      { "phrase": "long distance", "translation": "长距离" },
      { "phrase": "in the distance", "translation": "在远处" }
    ],
    "examples": [
      { "sentence": "What's the distance between Beijing and Shanghai?", "translation": "北京和上海之间的距离是多少？" },
      { "sentence": "She saw a light in the distance.", "translation": "她看到远处有一点亮光。" }
    ],
    "difficulty": "beginner",
    "category": "geography"
  },
  {
    "word": "double",
    "phonetic": "/ˈdʌbl/",
    "partOfSpeech": "adj./v.",
    "definition": "Twice as much or as many as usual",
    "translation": "双倍的，翻倍",
    "phrases": [
      { "phrase": "double room", "translation": "双人间" },
      { "phrase": "double check", "translation": "反复检查" }
    ],
    "examples": [
      { "sentence": "I'd like a double espresso, please.", "translation": "请给我一杯双倍浓缩咖啡。" },
      { "sentence": "The price of houses has doubled.", "translation": "房价已经翻了一倍。" }
    ],
    "difficulty": "beginner",
    "category": "math"
  },
  {
    "word": "dream",
    "phonetic": "/driːm/",
    "partOfSpeech": "n./v.",
    "definition": "A series of events or images that happen in your mind while you are sleeping",
    "translation": "梦想，做梦",
    "phrases": [
      { "phrase": "dream come true", "translation": "梦想成真" },
      { "phrase": "daydream", "translation": "白日梦" }
    ],
    "examples": [
      { "sentence": "I had a strange dream last night.", "translation": "我昨晚做了一个奇怪的梦。" },
      { "sentence": "My dream is to travel around the world.", "translation": "我的梦想是环游世界。" }
    ],
    "difficulty": "beginner",
    "category": "thought"
  },
  {
    "word": "dress",
    "phonetic": "/dres/",
    "partOfSpeech": "n./v.",
    "definition": "A piece of clothing for women or girls; to put on clothes",
    "translation": "连衣裙，穿衣",
    "phrases": [
      { "phrase": "get dressed", "translation": "穿好衣服" },
      { "phrase": "evening dress", "translation": "晚礼服" }
    ],
    "examples": [
      { "sentence": "She wore a black dress to the party.", "translation": "她穿着一件黑色的连衣裙去参加派对。" },
      { "sentence": "Hurry up and get dressed!", "translation": "快点穿好衣服！" }
    ],
    "difficulty": "beginner",
    "category": "daily"
  },
  {
    "word": "drive",
    "phonetic": "/draɪv/",
    "partOfSpeech": "v./n.",
    "definition": "To move and control a vehicle",
    "translation": "驾驶，开车",
    "phrases": [
      { "phrase": "drive a car", "translation": "开车" },
      { "phrase": "test drive", "translation": "试驾" }
    ],
    "examples": [
      { "sentence": "Do you know how to drive?", "translation": "你会开车吗？" },
      { "sentence": "He drives to work every day.", "translation": "他每天开车上班。" }
    ],
    "difficulty": "beginner",
    "category": "travel"
  },
  {
    "word": "during",
    "phonetic": "/ˈdʊrɪŋ/",
    "partOfSpeech": "prep.",
    "definition": "From the beginning to the end of a particular period",
    "translation": "在...期间",
    "phrases": [
      { "phrase": "during the day", "translation": "在白天" },
      { "phrase": "during the war", "translation": "在战争期间" }
    ],
    "examples": [
      { "sentence": "I woke up several times during the night.", "translation": "我在夜里醒了好几次。" },
      { "sentence": "Can you keep quiet during the movie?", "translation": "看电影时你能保持安静吗？" }
    ],
    "difficulty": "beginner",
    "category": "time"
  },
  {
    "word": "early",
    "phonetic": "/ˈɜːrli/",
    "partOfSpeech": "adj./adv.",
    "definition": "Before the usual time or the time that was expected",
    "translation": "早的，早到",
    "phrases": [
      { "phrase": "early morning", "translation": "清晨" },
      { "phrase": "early 20s", "translation": "二十出头" }
    ],
    "examples": [
      { "sentence": "I got up early this morning.", "translation": "我今天早上起床很早。" },
      { "sentence": "The train arrived ten minutes early.", "translation": "火车早到了十分钟。" }
    ],
    "difficulty": "beginner",
    "category": "time"
  },
  {
    "word": "earth",
    "phonetic": "/ɜːrθ/",
    "partOfSpeech": "n.",
    "definition": "The planet on which we live",
    "translation": "地球，泥土",
    "phrases": [
      { "phrase": "on earth", "translation": "究竟，到底；在地球上" },
      { "phrase": "save the earth", "translation": "拯救地球" }
    ],
    "examples": [
      { "sentence": "The moon goes round the earth.", "translation": "月亮绕着地球转。" },
      { "sentence": "Earth is our home.", "translation": "地球是我们的家园。" }
    ],
    "difficulty": "beginner",
    "category": "science"
  },
  {
    "word": "education",
    "phonetic": "/ˌedʒuˈkeɪʃn/",
    "partOfSpeech": "n.",
    "definition": "The process of teaching or learning, especially in a school or college",
    "translation": "教育",
    "phrases": [
      { "phrase": "higher education", "translation": "高等教育" },
      { "phrase": "primary education", "translation": "初等教育" }
    ],
    "examples": [
      { "sentence": "Education is the key to success.", "translation": "教育是成功的关键。" },
      { "sentence": "She wants to continue her education.", "translation": "她想继续深造。" }
    ],
    "difficulty": "beginner",
    "category": "education"
  },
  {
    "word": "effort",
    "phonetic": "/ˈefərt/",
    "partOfSpeech": "n.",
    "definition": "Physical or mental activity needed to achieve something",
    "translation": "努力，尝试",
    "phrases": [
      { "phrase": "make an effort", "translation": "做出努力" },
      { "phrase": "team effort", "translation": "团队努力" }
    ],
    "examples": [
      { "sentence": "It takes a lot of effort to learn a language.", "translation": "学习一门语言需要付出很多努力。" },
      { "sentence": "You should put more effort into your studies.", "translation": "你应该在学习上多下点功夫。" }
    ],
    "difficulty": "beginner",
    "category": "daily"
  },
  {
    "word": "empty",
    "phonetic": "/ˈempti/",
    "partOfSpeech": "adj./v.",
    "definition": "Not containing any things or people",
    "translation": "空的，倒空",
    "phrases": [
      { "phrase": "empty bottle", "translation": "空瓶子" },
      { "phrase": "empty-handed", "translation": "空手而归的" }
    ],
    "examples": [
      { "sentence": "The glass is empty.", "translation": "杯子是空的。" },
      { "sentence": "The house was completely empty.", "translation": "这房子完全是空的。" }
    ],
    "difficulty": "beginner",
    "category": "daily"
  },
  {
    "word": "engine",
    "phonetic": "/ˈendʒɪn/",
    "partOfSpeech": "n.",
    "definition": "A machine that uses energy to produce movement",
    "translation": "引擎，发动机",
    "phrases": [
      { "phrase": "start the engine", "translation": "启动引擎" },
      { "phrase": "search engine", "translation": "搜索引擎" }
    ],
    "examples": [
      { "sentence": "The engine won't start.", "translation": "发动机发动不起来。" },
      { "sentence": "He knows a lot about car engines.", "translation": "他对汽车引擎很了解。" }
    ],
    "difficulty": "beginner",
    "category": "science"
  },
  {
    "word": "enough",
    "phonetic": "/ɪˈnʌf/",
    "partOfSpeech": "adj./adv.",
    "definition": "As much as is needed",
    "translation": "足够的，充分地",
    "phrases": [
      { "phrase": "fair enough", "translation": "有道理，说得对" },
      { "phrase": "strangely enough", "translation": "说来也怪" }
    ],
    "examples": [
      { "sentence": "Is there enough food for everyone?", "translation": "食物够大家吃吗？" },
      { "sentence": "I've had enough of this noise!", "translation": "我受够了这噪音！" }
    ],
    "difficulty": "beginner",
    "category": "daily"
  },
  {
    "word": "environment",
    "phonetic": "/ɪnˈvaɪrənmənt/",
    "partOfSpeech": "n.",
    "definition": "The air, water, and land in or on which people, animals, and plants live",
    "translation": "环境",
    "phrases": [
      { "phrase": "protect the environment", "translation": "保护环境" },
      { "phrase": "working environment", "translation": "工作环境" }
    ],
    "examples": [
      { "sentence": "We must protect the environment.", "translation": "我们必须保护环境。" },
      { "sentence": "A peaceful environment is good for study.", "translation": "安静的环境有利于学习。" }
    ],
    "difficulty": "beginner",
    "category": "environment"
  },
  {
    "word": "equal",
    "phonetic": "/ˈiːkwəl/",
    "partOfSpeech": "adj./v.",
    "definition": "The same in amount, number, or size",
    "translation": "平等的，相等的",
    "phrases": [
      { "phrase": "equal rights", "translation": "平等权利" },
      { "phrase": "be equal to", "translation": "等于" }
    ],
    "examples": [
      { "sentence": "One plus one equals two.", "translation": "一加一等于二。" },
      { "sentence": "Everyone should have equal opportunities.", "translation": "每个人都应该有平等的机会。" }
    ],
    "difficulty": "beginner",
    "category": "math"
  },
  {
    "word": "event",
    "phonetic": "/ɪˈvent/",
    "partOfSpeech": "n.",
    "definition": "Anything that happens, especially something important",
    "translation": "事件，活动，项目",
    "phrases": [
      { "phrase": "current events", "translation": "时事" },
      { "phrase": "sporting event", "translation": "体育盛事" }
    ],
    "examples": [
      { "sentence": "The Olympic Games is a major sporting event.", "translation": "奥运会是一项重大的体育盛事。" },
      { "sentence": "It was the most important event in my life.", "translation": "那是我一生中最重要的事件。" }
    ],
    "difficulty": "beginner",
    "category": "daily"
  },
  {
    "word": "exactly",
    "phonetic": "/ɪɡˈzæktli/",
    "partOfSpeech": "adv.",
    "definition": "Used when you are giving or asking for information that is completely correct",
    "translation": "精确地，正是",
    "phrases": [
      { "phrase": "exactly the same", "translation": "完全一样" },
      { "phrase": "not exactly", "translation": "不完全是" }
    ],
    "examples": [
      { "sentence": "It's exactly nine o'clock.", "translation": "现在正是九点整。" },
      { "sentence": "That's exactly what I meant.", "translation": "那正是我所指的意思。" }
    ],
    "difficulty": "beginner",
    "category": "daily"
  },
  {
    "word": "example",
    "phonetic": "/ɪɡˈzæmpl/",
    "partOfSpeech": "n.",
    "definition": "Something that is typical of the group that it belongs to",
    "translation": "例子，范例",
    "phrases": [
      { "phrase": "for example", "translation": "例如" },
      { "phrase": "set an example", "translation": "树立榜样" }
    ],
    "examples": [
      { "sentence": "Can you give me an example?", "translation": "你能给我举个例子吗？" },
      { "sentence": "This is a good example of modern art.", "translation": "这是现代艺术的一个很好的范例。" }
    ],
    "difficulty": "beginner",
    "category": "daily"
  },
  {
    "word": "excellent",
    "phonetic": "/ˈeksələnt/",
    "partOfSpeech": "adj.",
    "definition": "Extremely good",
    "translation": "优秀的，卓越的",
    "phrases": [
      { "phrase": "excellent service", "translation": "优质服务" },
      { "phrase": "an excellent choice", "translation": "极佳的选择" }
    ],
    "examples": [
      { "sentence": "The food was excellent.", "translation": "食物非常棒。" },
      { "sentence": "You did an excellent job.", "translation": "你做得非常出色。" }
    ],
    "difficulty": "beginner",
    "category": "daily"
  },
  {
    "word": "exercise",
    "phonetic": "/ˈeksərsaɪz/",
    "partOfSpeech": "n./v.",
    "definition": "Physical activity that you do to make your body strong and healthy",
    "translation": "锻炼，练习",
    "phrases": [
      { "phrase": "take exercise", "translation": "进行锻炼" },
      { "phrase": "do exercises", "translation": "做操；做练习题" }
    ],
    "examples": [
      { "sentence": "Swimming is very good exercise.", "translation": "游泳是很好的运动。" },
      { "sentence": "You should exercise more often.", "translation": "你应该更经常地进行锻炼。" }
    ],
    "difficulty": "beginner",
    "category": "health"
  },
  {
    "word": "experience",
    "phonetic": "/ɪkˈspɪriəns/",
    "partOfSpeech": "n./v.",
    "definition": "Knowledge or skill from doing, seeing, or feeling things",
    "translation": "经验，经历",
    "phrases": [
      { "phrase": "work experience", "translation": "工作经验" },
      { "phrase": "learn by experience", "translation": "凭经验学习" }
    ],
    "examples": [
      { "sentence": "Do you have any experience in sales?", "translation": "你有销售经验吗？" },
      { "sentence": "It was a very interesting experience.", "translation": "那是一次非常有趣的经历。" }
    ],
    "difficulty": "beginner",
    "category": "work"
  },
  {
    "word": "explain",
    "phonetic": "/ɪkˈspleɪn/",
    "partOfSpeech": "v.",
    "definition": "To make something clear or easy to understand",
    "translation": "解释，说明",
    "phrases": [
      { "phrase": "explain why", "translation": "解释为什么" },
      { "phrase": "explain to someone", "translation": "向某人解释" }
    ],
    "examples": [
      { "sentence": "Can you explain how this machine works?", "translation": "你能解释一下这台机器是怎么运作的吗？" },
      { "sentence": "She explained the rules of the game to me.", "translation": "她向我解释了游戏的规则。" }
    ],
    "difficulty": "beginner",
    "category": "communication"
  },
  {
    "word": "express",
    "phonetic": "/ɪkˈspres/",
    "partOfSpeech": "v./adj.",
    "definition": "To show a feeling or opinion by what you say or do",
    "translation": "表达，特快",
    "phrases": [
      { "phrase": "express train", "translation": "特快列车" },
      { "phrase": "express oneself", "translation": "表达自己" }
    ],
    "examples": [
      { "sentence": "It's hard to express how I feel.", "translation": "很难表达我的感受。" },
      { "sentence": "He expressed his concern about the project.", "translation": "他表达了对这个项目的担忧。" }
    ],
    "difficulty": "beginner",
    "category": "communication"
  },
  {
    "word": "extra",
    "phonetic": "/ˈekstrə/",
    "partOfSpeech": "adj./adv.",
    "definition": "More than is usual, expected, or existing",
    "translation": "额外的，外加的",
    "phrases": [
      { "phrase": "extra money", "translation": "额外的钱" },
      { "phrase": "go the extra mile", "translation": "加倍努力" }
    ],
    "examples": [
      { "sentence": "Do you have an extra pen?", "translation": "你有多余的笔吗？" },
      { "sentence": "The hotel charges extra for breakfast.", "translation": "酒店的早餐是另外收费的。" }
    ],
    "difficulty": "beginner",
    "category": "daily"
  },
  {
    "word": "factory",
    "phonetic": "/ˈfæktəri/",
    "partOfSpeech": "n.",
    "definition": "A building or set of buildings where large amounts of goods are made using machines",
    "translation": "工厂",
    "phrases": [
      { "phrase": "car factory", "translation": "汽车工厂" },
      { "phrase": "factory worker", "translation": "工厂工人" }
    ],
    "examples": [
      { "sentence": "My uncle works in a shoe factory.", "translation": "我叔叔在一家鞋厂工作。" },
      { "sentence": "The factory produces 500 cars a day.", "translation": "这家工厂每天生产500辆汽车。" }
    ],
    "difficulty": "beginner",
    "category": "place"
  },
  {
    "word": "family",
    "phonetic": "/ˈfæməli/",
    "partOfSpeech": "n.",
    "definition": "A group of people who are related to each other",
    "translation": "家庭，家族",
    "phrases": [
      { "phrase": "family tree", "translation": "家谱" },
      { "phrase": "nuclear family", "translation": "核心家庭" }
    ],
    "examples": [
      { "sentence": "I have a large family.", "translation": "我有一个大家庭。" },
      { "sentence": "Family is very important to me.", "translation": "家庭对我来说非常重要。" }
    ],
    "difficulty": "beginner",
    "category": "family"
  },
  {
    "word": "famous",
    "phonetic": "/ˈfeɪməs/",
    "partOfSpeech": "adj.",
    "definition": "Known or recognized by many people",
    "translation": "著名的",
    "phrases": [
      { "phrase": "become famous", "translation": "成名" },
      { "phrase": "famous for", "translation": "以...闻名" }
    ],
    "examples": [
      { "sentence": "He is a famous actor.", "translation": "他是一个著名的演员。" },
      { "sentence": "France is famous for its wine.", "translation": "法国以葡萄酒闻名。" }
    ],
    "difficulty": "beginner",
    "category": "daily"
  },
  {
    "word": "favorite",
    "phonetic": "/ˈfeɪvərɪt/",
    "partOfSpeech": "adj./n.",
    "definition": "Best liked or most enjoyed",
    "translation": "最喜欢的",
    "phrases": [
      { "phrase": "favorite food", "translation": "最喜欢的食物" },
      { "phrase": "all-time favorite", "translation": "一直以来的最爱" }
    ],
    "examples": [
      { "sentence": "What's your favorite movie?", "translation": "你最喜欢的电影是什么？" },
      { "sentence": "This is my favorite song.", "translation": "这是我最喜欢的歌。" }
    ],
    "difficulty": "beginner",
    "category": "daily"
  },
  {
    "word": "feeling",
    "phonetic": "/ˈfiːlɪŋ/",
    "partOfSpeech": "n.",
    "definition": "An emotion that you feel, such as anger, sadness, or happiness",
    "translation": "感觉，情感",
    "phrases": [
      { "phrase": "hurt someone's feelings", "translation": "伤害某人的感情" },
      { "phrase": "a good feeling", "translation": "一种良好的感觉" }
    ],
    "examples": [
      { "sentence": "I have a strange feeling about this.", "translation": "我对这事有一种奇怪的感觉。" },
      { "sentence": "She tried to hide her feelings.", "translation": "她试图隐藏她的感情。" }
    ],
    "difficulty": "beginner",
    "category": "emotion"
  },
  {
    "word": "field",
    "phonetic": "/fiːld/",
    "partOfSpeech": "n.",
    "definition": "An area of land used for growing crops or keeping animals; an area of activity or interest",
    "translation": "田野，领域",
    "phrases": [
      { "phrase": "football field", "translation": "足球场" },
      { "phrase": "in the field of science", "translation": "在科学领域" }
    ],
    "examples": [
      { "sentence": "The cows are in the field.", "translation": "牛在田里。" },
      { "sentence": "He is an expert in his field.", "translation": "他是他那个领域的专家。" }
    ],
    "difficulty": "beginner",
    "category": "place"
  },
  {
    "word": "final",
    "phonetic": "/ˈfaɪnl/",
    "partOfSpeech": "adj./n.",
    "definition": "Last in a series",
    "translation": "最后的，最终的",
    "phrases": [
      { "phrase": "final exam", "translation": "期末考试" },
      { "phrase": "the grand final", "translation": "总决赛" }
    ],
    "examples": [
      { "sentence": "This is my final warning.", "translation": "这是我最后的警告。" },
      { "sentence": "The final decision is yours.", "translation": "最终决定权在你。" }
    ],
    "difficulty": "beginner",
    "category": "daily"
  }
];

module.exports = vocabularies;