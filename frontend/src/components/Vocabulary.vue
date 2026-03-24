<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { 
  getVocabulary, 
  addVocabulary, 
  updateVocabulary, 
  deleteVocabulary,
  toggleFavorite,
  toggleMastered,
  getVocabularyStats
} from '../api';

// 状态
const vocabularies = ref([]);
const stats = ref({ total: 0, mastered: 0, favorites: 0 });
const loading = ref(false);
const showAddModal = ref(false);
const showDetailModal = ref(false);
const editingVocabulary = ref(null);
const selectedVocabulary = ref(null);

// 筛选和搜索
const searchQuery = ref('');
const selectedCategory = ref('');
const selectedDifficulty = ref('');
const showFavoritesOnly = ref(false);
const showMasteredOnly = ref(false);

// 分页
const currentPage = ref(1);
const totalPages = ref(1);
const limit = 12;

// 表单数据
const form = reactive({
  word: '',
  phonetic: '',
  partOfSpeech: 'n.',
  definition: '',
  translation: '',
  phrases: [{ phrase: '', translation: '' }],
  examples: [{ sentence: '', translation: '' }],
  difficulty: 'beginner',
  category: 'daily'
});

// 选项
const partOfSpeechOptions = ['n.', 'v.', 'adj.', 'adv.', 'prep.', 'conj.', 'pron.', 'int.', 'phrase'];
const difficultyOptions = [
  { value: 'beginner', label: '初级' },
  { value: 'intermediate', label: '中级' },
  { value: 'advanced', label: '高级' }
];
const categoryOptions = [
  { value: 'daily', label: '日常' },
  { value: 'tech', label: '技术' },
  { value: 'business', label: '商务' },
  { value: 'academic', label: '学术' },
  { value: 'travel', label: '旅行' },
  { value: 'other', label: '其他' }
];

// 计算属性
const filteredVocabularies = computed(() => vocabularies.value);

// 获取词汇列表
async function fetchVocabularies() {
  loading.value = true;
  try {
    const params = {
      page: currentPage.value,
      limit
    };
    if (searchQuery.value) params.search = searchQuery.value;
    if (selectedCategory.value) params.category = selectedCategory.value;
    if (selectedDifficulty.value) params.difficulty = selectedDifficulty.value;
    if (showFavoritesOnly.value) params.isFavorite = true;
    if (showMasteredOnly.value) params.isMastered = true;

    const res = await getVocabulary(params);
    vocabularies.value = res.data;
    totalPages.value = res.pagination.pages;
  } catch (e) {
    console.error('获取词汇失败:', e);
  } finally {
    loading.value = false;
  }
}

// 获取统计信息
async function fetchStats() {
  try {
    const res = await getVocabularyStats();
    stats.value = res.data;
  } catch (e) {
    console.error('获取统计失败:', e);
  }
}

// 添加词组
function addPhrase() {
  form.phrases.push({ phrase: '', translation: '' });
}

// 删除词组
function removePhrase(index) {
  if (form.phrases.length > 1) {
    form.phrases.splice(index, 1);
  }
}

// 添加例句
function addExample() {
  form.examples.push({ sentence: '', translation: '' });
}

// 删除例句
function removeExample(index) {
  if (form.examples.length > 1) {
    form.examples.splice(index, 1);
  }
}

// 重置表单
function resetForm() {
  form.word = '';
  form.phonetic = '';
  form.partOfSpeech = 'n.';
  form.definition = '';
  form.translation = '';
  form.phrases = [{ phrase: '', translation: '' }];
  form.examples = [{ sentence: '', translation: '' }];
  form.difficulty = 'beginner';
  form.category = 'daily';
  editingVocabulary.value = null;
}

// 打开添加模态框
function openAddModal() {
  resetForm();
  showAddModal.value = true;
}

// 打开编辑模态框
function openEditModal(vocabulary) {
  editingVocabulary.value = vocabulary;
  Object.assign(form, {
    ...vocabulary,
    phrases: vocabulary.phrases.length ? [...vocabulary.phrases] : [{ phrase: '', translation: '' }],
    examples: vocabulary.examples.length ? [...vocabulary.examples] : [{ sentence: '', translation: '' }]
  });
  showAddModal.value = true;
}

// 关闭模态框
function closeModal() {
  showAddModal.value = false;
  resetForm();
}

// 提交表单
async function handleSubmit() {
  if (!form.word || !form.phonetic || !form.definition || !form.translation) {
    alert('请填写必填字段');
    return;
  }

  // 过滤空的词组和例句
  const data = {
    ...form,
    phrases: form.phrases.filter(p => p.phrase && p.translation),
    examples: form.examples.filter(e => e.sentence && e.translation)
  };

  try {
    if (editingVocabulary.value) {
      await updateVocabulary(editingVocabulary.value._id, data);
    } else {
      await addVocabulary(data);
    }
    closeModal();
    fetchVocabularies();
    fetchStats();
  } catch (e) {
    console.error('保存失败:', e);
    alert('保存失败: ' + (e.response?.data?.message || e.message));
  }
}

// 删除词汇
async function handleDelete(vocabulary) {
  if (!confirm(`确定要删除 "${vocabulary.word}" 吗？`)) return;
  
  try {
    await deleteVocabulary(vocabulary._id);
    fetchVocabularies();
    fetchStats();
  } catch (e) {
    console.error('删除失败:', e);
    alert('删除失败');
  }
}

// 切换收藏
async function handleToggleFavorite(vocabulary) {
  try {
    await toggleFavorite(vocabulary._id);
    fetchVocabularies();
    fetchStats();
  } catch (e) {
    console.error('操作失败:', e);
  }
}

// 切换掌握状态
async function handleToggleMastered(vocabulary) {
  try {
    await toggleMastered(vocabulary._id);
    fetchVocabularies();
    fetchStats();
  } catch (e) {
    console.error('操作失败:', e);
  }
}

// 查看详情
function showDetail(vocabulary) {
  selectedVocabulary.value = vocabulary;
  showDetailModal.value = true;
}

// 搜索
function handleSearch() {
  currentPage.value = 1;
  fetchVocabularies();
}

// 筛选
function handleFilter() {
  currentPage.value = 1;
  fetchVocabularies();
}

// 分页
function changePage(page) {
  currentPage.value = page;
  fetchVocabularies();
}

// 获取难度颜色
function getDifficultyColor(difficulty) {
  const colors = {
    beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
    intermediate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    advanced: 'bg-red-500/20 text-red-400 border-red-500/30'
  };
  return colors[difficulty] || colors.beginner;
}

// 获取分类标签
function getCategoryLabel(category) {
  const option = categoryOptions.find(o => o.value === category);
  return option ? option.label : category;
}

onMounted(() => {
  fetchVocabularies();
  fetchStats();
});
</script>

<template>
  <section
    id="vocabulary"
    class="relative py-24 md:py-32 overflow-hidden"
    style="background: var(--ink-bg);"
  >
    <div class="max-w-7xl mx-auto px-6">
      <!-- Section Header -->
      <div class="reveal text-center mb-16">
        <span
          class="text-xs tracking-[0.3em] uppercase font-medium"
          style="color: var(--ink-accent); font-family: var(--font-body);"
        >
          English Learning
        </span>
        <h2
          class="text-4xl md:text-5xl font-bold mt-3 mb-4"
          style="color: var(--ink-text); font-family: var(--font-display);"
        >
          英语<em>词汇</em>
        </h2>
        <div class="section-divider mx-auto mb-6"></div>
        <p
          class="max-w-lg mx-auto text-base"
          style="color: var(--ink-text-muted); font-family: var(--font-body);"
        >
          学习英语词汇，提升语言能力
        </p>
      </div>

      <!-- Stats Cards -->
      <div class="reveal grid grid-cols-3 gap-4 mb-12">
        <div
          class="p-6 rounded-2xl border text-center"
          style="background: var(--ink-card-bg); border-color: var(--ink-border);"
        >
          <div class="text-3xl font-bold mb-2" style="color: var(--ink-accent);">
            {{ stats.total }}
          </div>
          <div class="text-sm" style="color: var(--ink-text-muted);">总词汇</div>
        </div>
        <div
          class="p-6 rounded-2xl border text-center"
          style="background: var(--ink-card-bg); border-color: var(--ink-border);"
        >
          <div class="text-3xl font-bold mb-2" style="color: var(--ink-accent);">
            {{ stats.mastered }}
          </div>
          <div class="text-sm" style="color: var(--ink-text-muted);">已掌握</div>
        </div>
        <div
          class="p-6 rounded-2xl border text-center"
          style="background: var(--ink-card-bg); border-color: var(--ink-border);"
        >
          <div class="text-3xl font-bold mb-2" style="color: var(--ink-accent);">
            {{ stats.favorites }}
          </div>
          <div class="text-sm" style="color: var(--ink-text-muted);">收藏</div>
        </div>
      </div>

      <!-- Search and Filter -->
      <div class="reveal flex flex-wrap gap-4 mb-8">
        <input
          v-model="searchQuery"
          @input="handleSearch"
          type="text"
          placeholder="搜索单词..."
          class="flex-1 min-w-[200px] px-4 py-3 rounded-xl border text-sm outline-none
                 transition-all duration-300 focus:border-[var(--ink-accent)]"
          style="background: var(--ink-card-bg); border-color: var(--ink-border);
                 color: var(--ink-text); font-family: var(--font-body);"
        />
        <select
          v-model="selectedCategory"
          @change="handleFilter"
          class="px-4 py-3 rounded-xl border text-sm outline-none cursor-pointer
                 transition-all duration-300 focus:border-[var(--ink-accent)]"
          style="background: var(--ink-card-bg); border-color: var(--ink-border);
                 color: var(--ink-text); font-family: var(--font-body);"
        >
          <option value="">所有分类</option>
          <option v-for="opt in categoryOptions" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>
        <select
          v-model="selectedDifficulty"
          @change="handleFilter"
          class="px-4 py-3 rounded-xl border text-sm outline-none cursor-pointer
                 transition-all duration-300 focus:border-[var(--ink-accent)]"
          style="background: var(--ink-card-bg); border-color: var(--ink-border);
                 color: var(--ink-text); font-family: var(--font-body);"
        >
          <option value="">所有难度</option>
          <option v-for="opt in difficultyOptions" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>
        <button
          @click="showFavoritesOnly = !showFavoritesOnly; handleFilter()"
          class="px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-300"
          :class="showFavoritesOnly ? 'bg-[var(--ink-accent)] text-[var(--ink-bg)]' : ''"
          style="border-color: var(--ink-border); color: var(--ink-text);"
        >
          ⭐ 收藏
        </button>
        <button
          @click="showMasteredOnly = !showMasteredOnly; handleFilter()"
          class="px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-300"
          :class="showMasteredOnly ? 'bg-[var(--ink-accent)] text-[var(--ink-bg)]' : ''"
          style="border-color: var(--ink-border); color: var(--ink-text);"
        >
          ✓ 已掌握
        </button>
        <button
          @click="openAddModal"
          class="px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300
                 hover:shadow-lg hover:-translate-y-0.5"
          style="background: var(--ink-accent); color: var(--ink-bg);"
        >
          + 添加单词
        </button>
      </div>

      <!-- Vocabulary Grid -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block w-8 h-8 border-2 border-[var(--ink-accent)] border-t-transparent rounded-full animate-spin"></div>
        <p class="mt-4 text-sm" style="color: var(--ink-text-muted);">加载中...</p>
      </div>

      <div v-else-if="vocabularies.length === 0" class="text-center py-12">
        <p class="text-lg" style="color: var(--ink-text-muted);">暂无词汇</p>
        <button
          @click="openAddModal"
          class="mt-4 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300"
          style="background: var(--ink-accent); color: var(--ink-bg);"
        >
          添加第一个单词
        </button>
      </div>

      <div v-else class="reveal grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="vocabulary in vocabularies"
          :key="vocabulary._id"
          class="group relative p-6 rounded-2xl border transition-all duration-500
                 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
          style="border-color: var(--ink-border); background: var(--ink-card-bg);"
          @click="showDetail(vocabulary)"
        >
          <!-- Header -->
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <h3
                class="text-xl font-bold mb-1 transition-colors duration-300
                       group-hover:text-[var(--ink-accent)]"
                style="color: var(--ink-text); font-family: var(--font-display);"
              >
                {{ vocabulary.word }}
              </h3>
              <p class="text-sm" style="color: var(--ink-accent);">
                {{ vocabulary.phonetic }}
              </p>
            </div>
            <div class="flex gap-2">
              <button
                @click.stop="handleToggleFavorite(vocabulary)"
                class="p-2 rounded-lg transition-all duration-300 hover:bg-[var(--ink-accent)]/10"
                :class="vocabulary.isFavorite ? 'text-yellow-400' : ''"
                style="color: var(--ink-text-muted);"
              >
                {{ vocabulary.isFavorite ? '⭐' : '☆' }}
              </button>
              <button
                @click.stop="handleToggleMastered(vocabulary)"
                class="p-2 rounded-lg transition-all duration-300 hover:bg-[var(--ink-accent)]/10"
                :class="vocabulary.isMastered ? 'text-green-400' : ''"
                style="color: var(--ink-text-muted);"
              >
                {{ vocabulary.isMastered ? '✓' : '○' }}
              </button>
            </div>
          </div>

          <!-- Content -->
          <div class="mb-4">
            <span
              class="inline-block px-2 py-1 rounded text-xs font-medium mr-2 mb-2"
              style="background: var(--ink-accent)/20; color: var(--ink-accent);"
            >
              {{ vocabulary.partOfSpeech }}
            </span>
            <span
              :class="getDifficultyColor(vocabulary.difficulty)"
              class="inline-block px-2 py-1 rounded text-xs font-medium border mr-2 mb-2"
            >
              {{ difficultyOptions.find(d => d.value === vocabulary.difficulty)?.label }}
            </span>
            <span
              class="inline-block px-2 py-1 rounded text-xs font-medium mb-2"
              style="background: var(--ink-border); color: var(--ink-text-muted);"
            >
              {{ getCategoryLabel(vocabulary.category) }}
            </span>
          </div>

          <p class="text-sm mb-2" style="color: var(--ink-text);">
            {{ vocabulary.translation }}
          </p>
          <p class="text-xs line-clamp-2" style="color: var(--ink-text-muted);">
            {{ vocabulary.definition }}
          </p>

          <!-- Actions -->
          <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div class="flex gap-2">
              <button
                @click.stop="openEditModal(vocabulary)"
                class="p-2 rounded-lg bg-[var(--ink-accent)]/10 hover:bg-[var(--ink-accent)]/20
                       transition-all duration-300"
                style="color: var(--ink-accent);"
              >
                ✎
              </button>
              <button
                @click.stop="handleDelete(vocabulary)"
                class="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20
                       transition-all duration-300 text-red-400"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="reveal flex justify-center gap-2 mt-12">
        <button
          v-for="page in totalPages"
          :key="page"
          @click="changePage(page)"
          class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
          :class="page === currentPage ? 'bg-[var(--ink-accent)] text-[var(--ink-bg)]' : ''"
          style="border: 1px solid var(--ink-border); color: var(--ink-text);"
        >
          {{ page }}
        </button>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <transition
      enter-active-class="transition-all duration-300"
      leave-active-class="transition-all duration-200"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showAddModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        style="background: rgba(0,0,0,0.8);"
        @click.self="closeModal"
      >
        <div
          class="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-8"
          style="background: var(--ink-card-bg);"
        >
          <h3 class="text-2xl font-bold mb-6" style="color: var(--ink-text);">
            {{ editingVocabulary ? '编辑词汇' : '添加新词汇' }}
          </h3>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Basic Info -->
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-2" style="color: var(--ink-text);">
                  单词 *
                </label>
                <input
                  v-model="form.word"
                  type="text"
                  required
                  class="w-full px-4 py-3 rounded-xl border text-sm outline-none
                         transition-all duration-300 focus:border-[var(--ink-accent)]"
                  style="background: var(--ink-bg); border-color: var(--ink-border);
                         color: var(--ink-text);"
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-2" style="color: var(--ink-text);">
                  音标 *
                </label>
                <input
                  v-model="form.phonetic"
                  type="text"
                  required
                  placeholder="/həˈloʊ/"
                  class="w-full px-4 py-3 rounded-xl border text-sm outline-none
                         transition-all duration-300 focus:border-[var(--ink-accent)]"
                  style="background: var(--ink-bg); border-color: var(--ink-border);
                         color: var(--ink-text);"
                />
              </div>
            </div>

            <div class="grid md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium mb-2" style="color: var(--ink-text);">
                  词性
                </label>
                <select
                  v-model="form.partOfSpeech"
                  class="w-full px-4 py-3 rounded-xl border text-sm outline-none cursor-pointer
                         transition-all duration-300 focus:border-[var(--ink-accent)]"
                  style="background: var(--ink-bg); border-color: var(--ink-border);
                         color: var(--ink-text);"
                >
                  <option v-for="pos in partOfSpeechOptions" :key="pos" :value="pos">
                    {{ pos }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium mb-2" style="color: var(--ink-text);">
                  难度
                </label>
                <select
                  v-model="form.difficulty"
                  class="w-full px-4 py-3 rounded-xl border text-sm outline-none cursor-pointer
                         transition-all duration-300 focus:border-[var(--ink-accent)]"
                  style="background: var(--ink-bg); border-color: var(--ink-border);
                         color: var(--ink-text);"
                >
                  <option v-for="opt in difficultyOptions" :key="opt.value" :value="opt.value">
                    {{ opt.label }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium mb-2" style="color: var(--ink-text);">
                  分类
                </label>
                <select
                  v-model="form.category"
                  class="w-full px-4 py-3 rounded-xl border text-sm outline-none cursor-pointer
                         transition-all duration-300 focus:border-[var(--ink-accent)]"
                  style="background: var(--ink-bg); border-color: var(--ink-border);
                         color: var(--ink-text);"
                >
                  <option v-for="opt in categoryOptions" :key="opt.value" :value="opt.value">
                    {{ opt.label }}
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium mb-2" style="color: var(--ink-text);">
                中文翻译 *
              </label>
              <input
                v-model="form.translation"
                type="text"
                required
                class="w-full px-4 py-3 rounded-xl border text-sm outline-none
                       transition-all duration-300 focus:border-[var(--ink-accent)]"
                style="background: var(--ink-bg); border-color: var(--ink-border);
                       color: var(--ink-text);"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-2" style="color: var(--ink-text);">
                英文释义 *
              </label>
              <textarea
                v-model="form.definition"
                rows="2"
                required
                class="w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none
                       transition-all duration-300 focus:border-[var(--ink-accent)]"
                style="background: var(--ink-bg); border-color: var(--ink-border);
                       color: var(--ink-text);"
              ></textarea>
            </div>

            <!-- Phrases -->
            <div>
              <label class="block text-sm font-medium mb-2" style="color: var(--ink-text);">
                常用词组
              </label>
              <div v-for="(phrase, index) in form.phrases" :key="index" class="flex gap-2 mb-2">
                <input
                  v-model="phrase.phrase"
                  type="text"
                  placeholder="词组"
                  class="flex-1 px-4 py-2 rounded-lg border text-sm outline-none
                         transition-all duration-300 focus:border-[var(--ink-accent)]"
                  style="background: var(--ink-bg); border-color: var(--ink-border);
                         color: var(--ink-text);"
                />
                <input
                  v-model="phrase.translation"
                  type="text"
                  placeholder="翻译"
                  class="flex-1 px-4 py-2 rounded-lg border text-sm outline-none
                         transition-all duration-300 focus:border-[var(--ink-accent)]"
                  style="background: var(--ink-bg); border-color: var(--ink-border);
                         color: var(--ink-text);"
                />
                <button
                  type="button"
                  @click="removePhrase(index)"
                  class="px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10
                         transition-all duration-300"
                >
                  ✕
                </button>
              </div>
              <button
                type="button"
                @click="addPhrase"
                class="text-sm px-4 py-2 rounded-lg border transition-all duration-300
                       hover:bg-[var(--ink-accent)]/10"
                style="border-color: var(--ink-border); color: var(--ink-accent);"
              >
                + 添加词组
              </button>
            </div>

            <!-- Examples -->
            <div>
              <label class="block text-sm font-medium mb-2" style="color: var(--ink-text);">
                例句
              </label>
              <div v-for="(example, index) in form.examples" :key="index" class="mb-4 p-4 rounded-xl border" style="border-color: var(--ink-border);">
                <div class="flex gap-2 mb-2">
                  <textarea
                    v-model="example.sentence"
                    rows="2"
                    placeholder="英文例句"
                    class="flex-1 px-4 py-2 rounded-lg border text-sm outline-none resize-none
                           transition-all duration-300 focus:border-[var(--ink-accent)]"
                    style="background: var(--ink-bg); border-color: var(--ink-border);
                           color: var(--ink-text);"
                  ></textarea>
                  <button
                    type="button"
                    @click="removeExample(index)"
                    class="px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10
                           transition-all duration-300 self-start"
                  >
                    ✕
                  </button>
                </div>
                <input
                  v-model="example.translation"
                  type="text"
                  placeholder="中文翻译"
                  class="w-full px-4 py-2 rounded-lg border text-sm outline-none
                         transition-all duration-300 focus:border-[var(--ink-accent)]"
                  style="background: var(--ink-bg); border-color: var(--ink-border);
                         color: var(--ink-text);"
                />
              </div>
              <button
                type="button"
                @click="addExample"
                class="text-sm px-4 py-2 rounded-lg border transition-all duration-300
                       hover:bg-[var(--ink-accent)]/10"
                style="border-color: var(--ink-border); color: var(--ink-accent);"
              >
                + 添加例句
              </button>
            </div>

            <!-- Actions -->
            <div class="flex gap-4 pt-4">
              <button
                type="button"
                @click="closeModal"
                class="flex-1 py-3 rounded-xl font-medium text-sm border
                       transition-all duration-300 hover:bg-[var(--ink-accent)]/10"
                style="border-color: var(--ink-border); color: var(--ink-text);"
              >
                取消
              </button>
              <button
                type="submit"
                class="flex-1 py-3 rounded-xl font-medium text-sm
                       transition-all duration-300 hover:shadow-lg"
                style="background: var(--ink-accent); color: var(--ink-bg);"
              >
                {{ editingVocabulary ? '保存修改' : '添加词汇' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>

    <!-- Detail Modal -->
    <transition
      enter-active-class="transition-all duration-300"
      leave-active-class="transition-all duration-200"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showDetailModal && selectedVocabulary"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        style="background: rgba(0,0,0,0.8);"
        @click.self="showDetailModal = false"
      >
        <div
          class="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-8"
          style="background: var(--ink-card-bg);"
        >
          <!-- Header -->
          <div class="flex items-start justify-between mb-6">
            <div>
              <h3 class="text-3xl font-bold mb-2" style="color: var(--ink-text); font-family: var(--font-display);">
                {{ selectedVocabulary.word }}
              </h3>
              <p class="text-lg" style="color: var(--ink-accent);">
                {{ selectedVocabulary.phonetic }}
              </p>
            </div>
            <button
              @click="showDetailModal = false"
              class="p-2 rounded-lg hover:bg-[var(--ink-accent)]/10 transition-all duration-300"
              style="color: var(--ink-text-muted);"
            >
              ✕
            </button>
          </div>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2 mb-6">
            <span
              class="px-3 py-1 rounded-full text-sm font-medium"
              style="background: var(--ink-accent)/20; color: var(--ink-accent);"
            >
              {{ selectedVocabulary.partOfSpeech }}
            </span>
            <span
              :class="getDifficultyColor(selectedVocabulary.difficulty)"
              class="px-3 py-1 rounded-full text-sm font-medium border"
            >
              {{ difficultyOptions.find(d => d.value === selectedVocabulary.difficulty)?.label }}
            </span>
            <span
              class="px-3 py-1 rounded-full text-sm font-medium"
              style="background: var(--ink-border); color: var(--ink-text-muted);"
            >
              {{ getCategoryLabel(selectedVocabulary.category) }}
            </span>
          </div>

          <!-- Translation & Definition -->
          <div class="mb-6">
            <h4 class="text-sm font-medium mb-2" style="color: var(--ink-accent);">中文翻译</h4>
            <p class="text-lg mb-4" style="color: var(--ink-text);">
              {{ selectedVocabulary.translation }}
            </p>
            <h4 class="text-sm font-medium mb-2" style="color: var(--ink-accent);">英文释义</h4>
            <p style="color: var(--ink-text-muted);">
              {{ selectedVocabulary.definition }}
            </p>
          </div>

          <!-- Phrases -->
          <div v-if="selectedVocabulary.phrases.length" class="mb-6">
            <h4 class="text-sm font-medium mb-3" style="color: var(--ink-accent);">常用词组</h4>
            <div class="space-y-2">
              <div
                v-for="(phrase, index) in selectedVocabulary.phrases"
                :key="index"
                class="p-3 rounded-xl"
                style="background: var(--ink-bg);"
              >
                <p class="font-medium mb-1" style="color: var(--ink-text);">
                  {{ phrase.phrase }}
                </p>
                <p class="text-sm" style="color: var(--ink-text-muted);">
                  {{ phrase.translation }}
                </p>
              </div>
            </div>
          </div>

          <!-- Examples -->
          <div v-if="selectedVocabulary.examples.length" class="mb-6">
            <h4 class="text-sm font-medium mb-3" style="color: var(--ink-accent);">例句</h4>
            <div class="space-y-3">
              <div
                v-for="(example, index) in selectedVocabulary.examples"
                :key="index"
                class="p-4 rounded-xl"
                style="background: var(--ink-bg);"
              >
                <p class="mb-2" style="color: var(--ink-text);">
                  {{ example.sentence }}
                </p>
                <p class="text-sm" style="color: var(--ink-text-muted);">
                  {{ example.translation }}
                </p>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-4 pt-4 border-t" style="border-color: var(--ink-border);">
            <button
              @click="handleToggleFavorite(selectedVocabulary)"
              class="flex-1 py-3 rounded-xl font-medium text-sm border
                     transition-all duration-300 hover:bg-[var(--ink-accent)]/10"
              :class="selectedVocabulary.isFavorite ? 'text-yellow-400' : ''"
              style="border-color: var(--ink-border); color: var(--ink-text);"
            >
              {{ selectedVocabulary.isFavorite ? '⭐ 已收藏' : '☆ 添加收藏' }}
            </button>
            <button
              @click="handleToggleMastered(selectedVocabulary)"
              class="flex-1 py-3 rounded-xl font-medium text-sm border
                     transition-all duration-300 hover:bg-[var(--ink-accent)]/10"
              :class="selectedVocabulary.isMastered ? 'text-green-400' : ''"
              style="border-color: var(--ink-border); color: var(--ink-text);"
            >
              {{ selectedVocabulary.isMastered ? '✓ 已掌握' : '○ 标记掌握' }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>