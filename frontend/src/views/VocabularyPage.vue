<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {
  getVocabulary, 
  addVocabulary, 
  updateVocabulary, 
  deleteVocabulary,
  toggleFavorite,
  toggleMastered,
  getVocabularyStats
} from '../api';
import { useSpeech } from '../composables/useSpeech';
import AppSelect from '../components/AppSelect.vue';
import { useUi } from '../ui/service';
import { parseVocabularyImport } from '../utils/vocabularyImport';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const { confirm, toast } = useUi();
const auth = useAuthStore();
const toolbarFieldClass = 'h-14 rounded-xl border text-sm font-medium shadow-sm transition-all duration-300 hover:shadow-lg focus:border-[var(--ink-accent)] focus:shadow-lg';
const toolbarFilterButtonClass = 'h-14 px-5 rounded-xl border text-sm font-medium shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg';
const toolbarPrimaryButtonClass = 'h-14 px-8 rounded-xl text-sm font-bold shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl';
const toolbarSecondaryButtonClass = 'h-14 px-8 rounded-xl border text-sm font-bold shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl';

// 状态
const vocabularies = ref([]);
const stats = ref({ total: 0, mastered: 0, favorites: 0 });
const loading = ref(false);
const showAddModal = ref(false);
const showDetailModal = ref(false);
const editingVocabulary = ref(null);
const selectedVocabulary = ref(null);
const jsonMode = ref(false);
const jsonInput = ref('');
const jsonError = ref('');

// 语音播放
const { isSpeaking, isSupported, speak, stop } = useSpeech();

// 筛选和搜索
const searchQuery = ref('');
const selectedCategory = ref('');
const selectedDifficulty = ref('');
const showFavoritesOnly = ref(false);
const showMasteredOnly = ref(false);
let searchTimeout = null;

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

// 分页：只显示当前页附近的页码
const visiblePages = computed(() => {
  const pages = [];
  const start = Math.max(1, currentPage.value - 2);
  const end = Math.min(totalPages.value, currentPage.value + 2);
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

function getFilterButtonStyle(isActive) {
  return isActive
    ? 'background: var(--ink-accent); border-color: transparent; color: var(--ink-bg);'
    : 'background: var(--ink-card-bg); border-color: var(--ink-border); color: var(--ink-text);';
}

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
  jsonMode.value = false;
  jsonInput.value = '';
  jsonError.value = '';
  resetForm();
}

// 提交表单
async function handleSubmit() {
  if (!form.word || !form.phonetic || !form.definition || !form.translation) {
    toast.warning('请填写必填字段');
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
    toast.error('保存失败: ' + (e.response?.data?.message || e.message));
  }
}

// JSON 批量导入
async function handleJsonSubmit() {
  jsonError.value = '';

  try {
    const items = parseVocabularyImport(jsonInput.value);
    const res = await addVocabulary(items);
    toast.success(res.message || `成功添加 ${items.length} 条词汇`);
    closeModal();
    fetchVocabularies();
    fetchStats();
  } catch (e) {
    jsonError.value = e.response?.data?.message || e.message || '导入失败，请检查数据格式';
    return;
  }
}

// 删除词汇
async function handleDelete(vocabulary) {
  const confirmed = await confirm({
    title: '删除词汇',
    message: `确定要删除 "${vocabulary.word}" 吗？此操作无法撤销。`,
    confirmLabel: '删除',
    cancelLabel: '取消',
    tone: 'danger'
  });

  if (!confirmed) return;
  
  try {
    await deleteVocabulary(vocabulary._id);
    fetchVocabularies();
    fetchStats();
  } catch (e) {
    console.error('删除失败:', e);
    toast.error('删除失败');
  }
}

// 切换收藏
async function handleToggleFavorite(vocabulary) {
  if (!auth.isLoggedIn) {
    toast.warning('请先登录');
    router.push('/login');
    return;
  }
  
  try {
    const res = await toggleFavorite(vocabulary._id);
    // 只更新当前词汇的状态，不重新获取列表
    vocabulary.isFavorite = res.data.isFavorite;
    // 更新统计信息中的收藏数量
    if (vocabulary.isFavorite) {
      stats.value.favorites++;
    } else {
      stats.value.favorites--;
    }
  } catch (e) {
    console.error('操作失败:', e);
  }
}

// 切换掌握状态
async function handleToggleMastered(vocabulary) {
  if (!auth.isLoggedIn) {
    toast.warning('请先登录');
    router.push('/login');
    return;
  }
  
  try {
    const res = await toggleMastered(vocabulary._id);
    // 只更新当前词汇的状态，不重新获取列表
    vocabulary.isMastered = res.data.isMastered;
    // 更新统计信息中的掌握数量
    if (vocabulary.isMastered) {
      stats.value.mastered++;
    } else {
      stats.value.mastered--;
    }
  } catch (e) {
    console.error('操作失败:', e);
  }
}

// 查看详情
function showDetail(vocabulary) {
  selectedVocabulary.value = vocabulary;
  showDetailModal.value = true;
}

// 搜索 - 带防抖优化
function handleSearch() {
  // 清除之前的定时器
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  
  // 如果搜索词为空，直接重新获取数据
  if (!searchQuery.value.trim()) {
    currentPage.value = 1;
    fetchVocabularies();
    return;
  }
  
  // 设置防抖，500ms后才发送请求
  searchTimeout = setTimeout(() => {
    currentPage.value = 1;
    fetchVocabularies();
  }, 500);
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

// 播放语音
function playAudio(word) {
  if (isSupported.value) {
    speak(word, {
      lang: 'en-US',
      rate: 0.8,
      pitch: 1,
      volume: 1
    });
  } else {
    toast.info('您的浏览器不支持语音播放功能');
  }
}

onMounted(() => {
  fetchVocabularies();
  fetchStats();
});
</script>

<template>
  <div class="min-h-screen" style="background: var(--ink-bg);">
    <!-- Header -->
    <div class="pt-24 pb-12 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h1
            class="text-5xl md:text-6xl font-bold mb-4"
            style="color: var(--ink-text); font-family: var(--font-display);"
          >
            英语<em style="color: var(--ink-accent);">词汇</em>
          </h1>
          <p
            class="text-lg max-w-2xl mx-auto"
            style="color: var(--ink-text-muted); font-family: var(--font-body);"
          >
            学习英语词汇，提升语言能力，让每一天都有进步
          </p>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-3 gap-6 mb-12">
          <div
            class="p-8 rounded-2xl border text-center transition-all duration-300 hover:shadow-xl"
            style="background: var(--ink-card-bg); border-color: var(--ink-border);"
          >
            <div class="text-4xl font-bold mb-3" style="color: var(--ink-accent);">
              {{ stats.total }}
            </div>
            <div class="text-sm font-medium" style="color: var(--ink-text-muted);">总词汇</div>
          </div>
          <div
            class="p-8 rounded-2xl border text-center transition-all duration-300 hover:shadow-xl"
            style="background: var(--ink-card-bg); border-color: var(--ink-border);"
          >
            <div class="text-4xl font-bold mb-3" style="color: var(--ink-accent);">
              {{ stats.mastered }}
            </div>
            <div class="text-sm font-medium" style="color: var(--ink-text-muted);">已掌握</div>
          </div>
          <div
            class="p-8 rounded-2xl border text-center transition-all duration-300 hover:shadow-xl"
            style="background: var(--ink-card-bg); border-color: var(--ink-border);"
          >
            <div class="text-4xl font-bold mb-3" style="color: var(--ink-accent);">
              {{ stats.favorites }}
            </div>
            <div class="text-sm font-medium" style="color: var(--ink-text-muted);">收藏</div>
          </div>
        </div>

        <!-- Search and Filter -->
        <div class="flex flex-wrap gap-4 mb-8">
          <input
            v-model="searchQuery"
            @input="handleSearch"
            type="text"
            placeholder="搜索单词..."
            :class="['flex-1 min-w-[240px] px-5 outline-none', toolbarFieldClass]"
            style="background: var(--ink-card-bg); border-color: var(--ink-border);
                   color: var(--ink-text); font-family: var(--font-body);"
          />
          <AppSelect
            v-model="selectedCategory"
            @change="handleFilter"
            variant="toolbar"
            class="min-w-[160px]"
          >
            <option value="">所有分类</option>
            <option v-for="opt in categoryOptions" :key="opt.value" :value="opt.value">
              {{ opt.label }}
            </option>
          </AppSelect>
          <AppSelect
            v-model="selectedDifficulty"
            @change="handleFilter"
            variant="toolbar"
            class="min-w-[160px]"
          >
            <option value="">所有难度</option>
            <option v-for="opt in difficultyOptions" :key="opt.value" :value="opt.value">
              {{ opt.label }}
            </option>
          </AppSelect>
          <button
            @click="showFavoritesOnly = !showFavoritesOnly; handleFilter()"
            :class="toolbarFilterButtonClass"
            :style="getFilterButtonStyle(showFavoritesOnly)"
          >
            ⭐ 收藏
          </button>
          <button
            @click="showMasteredOnly = !showMasteredOnly; handleFilter()"
            :class="toolbarFilterButtonClass"
            :style="getFilterButtonStyle(showMasteredOnly)"
          >
            ✓ 已掌握
          </button>
        <button
          v-if="auth.isAdmin"
          @click="openAddModal"
          :class="toolbarPrimaryButtonClass"
          style="background: var(--ink-accent); color: var(--ink-bg);"
        >
          + 添加单词
        </button>
          <button
            @click="router.push('/vocabulary/memory')"
            :class="toolbarSecondaryButtonClass"
            style="background: color-mix(in srgb, var(--ink-card-bg) 88%, var(--ink-accent) 12%); border-color: var(--ink-accent); color: var(--ink-accent);"
          >
            记忆模式
          </button>
        </div>
      </div>
    </div>

    <!-- Vocabulary Grid -->
    <div class="px-6 pb-24">
      <div class="max-w-7xl mx-auto">
        <div v-if="loading" class="text-center py-24">
          <div class="inline-block w-12 h-12 border-3 border-[var(--ink-accent)] border-t-transparent rounded-full animate-spin"></div>
          <p class="mt-6 text-lg" style="color: var(--ink-text-muted);">加载中...</p>
        </div>

        <div v-else-if="vocabularies.length === 0" class="text-center py-24">
          <div class="text-6xl mb-6">📚</div>
          <p class="text-2xl font-bold mb-4" style="color: var(--ink-text-muted);">暂无词汇</p>
          <p class="mb-8" style="color: var(--ink-text-muted);">开始添加你的第一个单词吧！</p>
          <button
            v-if="auth.isAdmin"
            @click="openAddModal"
            class="px-8 py-4 rounded-xl text-sm font-bold transition-all duration-300
                   hover:shadow-xl hover:-translate-y-1"
            style="background: var(--ink-accent); color: var(--ink-bg);"
          >
            添加第一个单词
          </button>
        </div>

        <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                <div class="flex items-center gap-2 mb-1">
                  <h3
                    class="text-xl font-bold transition-colors duration-300
                           group-hover:text-[var(--ink-accent)]"
                    style="color: var(--ink-text); font-family: var(--font-display);"
                  >
                    {{ vocabulary.word }}
                  </h3>
                  <button
                    @click.stop="playAudio(vocabulary.word)"
                    class="p-1 rounded-lg transition-all duration-300 hover:bg-[var(--ink-accent)]/10"
                    :class="isSpeaking ? 'text-[var(--ink-accent)] animate-pulse' : ''"
                    style="color: var(--ink-text-muted);"
                    title="播放发音"
                  >
                    🔊
                  </button>
                </div>
                <p class="text-sm" style="color: var(--ink-accent);">
                  {{ vocabulary.phonetic }}
                </p>
              </div>
            </div>

            <!-- Content -->
            <div class="mb-4">
              <span
                class="inline-block px-3 py-1 rounded-full text-xs font-medium mr-2 mb-2"
                style="background: var(--ink-accent)/20; color: var(--ink-accent);"
              >
                {{ vocabulary.partOfSpeech }}
              </span>
              <span
                :class="getDifficultyColor(vocabulary.difficulty)"
                class="inline-block px-3 py-1 rounded-full text-xs font-medium border mr-2 mb-2"
              >
                {{ difficultyOptions.find(d => d.value === vocabulary.difficulty)?.label }}
              </span>
              <span
                class="inline-block px-3 py-1 rounded-full text-xs font-medium mb-2"
                style="background: var(--ink-border); color: var(--ink-text-muted);"
              >
                {{ getCategoryLabel(vocabulary.category) }}
              </span>
            </div>

            <p class="text-sm mb-2 font-medium" style="color: var(--ink-text);">
              {{ vocabulary.translation }}
            </p>
            <p class="text-xs line-clamp-2" style="color: var(--ink-text-muted);">
              {{ vocabulary.definition }}
            </p>

            <!-- Actions -->
            <div class="flex justify-between items-center mt-4 pt-4 border-t" style="border-color: var(--ink-border);">
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
              <div
                v-if="auth.isAdmin"
                class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
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
        <div v-if="totalPages > 1" class="mt-16">
          <!-- 移动端：紧凑横向滚动分页 -->
          <div class="md:hidden">
            <div class="flex items-center justify-center gap-1 overflow-x-auto pb-2 px-2">
              <!-- 上一页 -->
              <button
                @click="changePage(currentPage - 1)"
                :disabled="currentPage === 1"
                class="flex-shrink-0 w-10 h-10 rounded-lg text-sm font-medium transition-all duration-300
                       hover:shadow-lg disabled:opacity-30 disabled:cursor-not-allowed"
                style="border: 1px solid var(--ink-border); color: var(--ink-text);"
              >&lsaquo;</button>

              <!-- 页码按钮 -->
              <div class="flex gap-1 overflow-x-auto">
                <button
                  v-for="page in visiblePages"
                  :key="page"
                  @click="changePage(page)"
                  class="flex-shrink-0 w-10 h-10 rounded-lg text-sm font-medium transition-all duration-300
                         hover:shadow-lg"
                  :class="page === currentPage ? 'bg-[var(--ink-accent)] text-[var(--ink-bg)] shadow-xl' : ''"
                  style="border: 1px solid var(--ink-border); color: var(--ink-text);"
                >{{ page }}</button>
              </div>

              <!-- 下一页 -->
              <button
                @click="changePage(currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="flex-shrink-0 w-10 h-10 rounded-lg text-sm font-medium transition-all duration-300
                       hover:shadow-lg disabled:opacity-30 disabled:cursor-not-allowed"
                style="border: 1px solid var(--ink-border); color: var(--ink-text);"
              >&rsaquo;</button>
            </div>
            <p class="text-center text-xs mt-2 opacity-50">第 {{ currentPage }} / {{ totalPages }} 页</p>
          </div>

          <!-- 桌面端：完整分页 -->
          <div class="hidden md:flex justify-center items-center gap-2">
            <!-- 上一页 -->
            <button
              @click="changePage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300
                     hover:shadow-lg disabled:opacity-30 disabled:cursor-not-allowed"
              style="border: 1px solid var(--ink-border); color: var(--ink-text);"
            >&lsaquo;</button>

            <!-- 第一页 -->
            <button
              v-if="currentPage > 3"
              @click="changePage(1)"
              class="px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:shadow-lg"
              style="border: 1px solid var(--ink-border); color: var(--ink-text);"
            >1</button>
            <span v-if="currentPage > 4" class="px-2 opacity-40">...</span>

            <!-- 中间页码 -->
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="changePage(page)"
              class="px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300
                     hover:shadow-lg"
              :class="page === currentPage ? 'bg-[var(--ink-accent)] text-[var(--ink-bg)] shadow-xl' : ''"
              style="border: 1px solid var(--ink-border); color: var(--ink-text);"
            >{{ page }}</button>

            <!-- 最后一页 -->
            <span v-if="currentPage < totalPages - 3" class="px-2 opacity-40">...</span>
            <button
              v-if="currentPage < totalPages - 2"
              @click="changePage(totalPages)"
              class="px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:shadow-lg"
              style="border: 1px solid var(--ink-border); color: var(--ink-text);"
            >{{ totalPages }}</button>

            <!-- 下一页 -->
            <button
              @click="changePage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300
                     hover:shadow-lg disabled:opacity-30 disabled:cursor-not-allowed"
              style="border: 1px solid var(--ink-border); color: var(--ink-text);"
            >&rsaquo;</button>
          </div>
        </div>
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
          class="w-full max-w-3xl max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-2xl p-4 md:p-8"
          style="background: var(--ink-card-bg);"
        >
          <h3 class="text-2xl md:text-3xl font-bold mb-6 md:mb-8" style="color: var(--ink-text);">
            {{ editingVocabulary ? '编辑词汇' : '添加新词汇' }}
          </h3>

          <!-- 输入模式切换（仅添加时显示） -->
          <div v-if="!editingVocabulary" class="flex gap-2 md:gap-3 mb-6 md:mb-8">
            <button
              type="button"
              @click="jsonMode = false"
              class="px-3 md:px-5 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-medium transition-all duration-300"
              :class="!jsonMode ? 'text-white' : ''"
              :style="!jsonMode
                ? 'background: var(--ink-accent);'
                : 'border: 1px solid var(--ink-border); color: var(--ink-text);'"
            >表单输入</button>
            <button
              type="button"
              @click="jsonMode = true"
              class="px-3 md:px-5 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-medium transition-all duration-300"
              :class="jsonMode ? 'text-white' : ''"
              :style="jsonMode
                ? 'background: var(--ink-accent);'
                : 'border: 1px solid var(--ink-border); color: var(--ink-text);'"
            >JSON 导入</button>
          </div>

          <!-- JSON 输入模式 -->
          <div v-if="jsonMode && !editingVocabulary">
            <p class="text-xs mb-3 opacity-50">
              只支持严格 JSON：单个对象 { ... } 或数组 [{ ... }, { ... }]，key 和字符串都需要双引号
            </p>
            <textarea
              v-model="jsonInput"
              rows="12"
              placeholder='[
  {
    "word": "hello",
    "phonetic": "/həˈloʊ/",
    "partOfSpeech": "int.",
    "definition": "Used as a greeting",
    "translation": "你好",
    "difficulty": "beginner",
    "category": "daily",
    "phrases": [{ "phrase": "say hello", "translation": "打招呼" }],
    "examples": [{ "sentence": "Hello!", "translation": "你好！" }]
  }
]'
              class="w-full px-4 md:px-5 py-3 md:py-4 rounded-xl border text-xs md:text-sm outline-none font-mono
                     transition-all duration-300 focus:border-[var(--ink-accent)] focus:shadow-lg resize-none"
              style="background: var(--ink-bg); border-color: var(--ink-border);
                     color: var(--ink-text);"
            ></textarea>
            <p v-if="jsonError" class="text-sm text-red-500 mt-3">{{ jsonError }}</p>

            <div class="flex gap-3 md:gap-4 pt-4 md:pt-6">
              <button
                type="button"
                @click="closeModal"
                class="flex-1 py-3 md:py-4 rounded-xl font-medium text-xs md:text-sm border
                       transition-all duration-300 hover:bg-[var(--ink-accent)]/10"
                style="border-color: var(--ink-border); color: var(--ink-text);"
              >取消</button>
              <button
                type="button"
                @click="handleJsonSubmit"
                :disabled="!jsonInput.trim()"
                class="flex-1 py-3 md:py-4 rounded-xl font-bold text-xs md:text-sm
                       transition-all duration-300 hover:shadow-xl hover:-translate-y-1
                       disabled:opacity-40 disabled:cursor-not-allowed"
                style="background: var(--ink-accent); color: var(--ink-bg);"
              >导入</button>
            </div>
          </div>

          <form v-else @submit.prevent="handleSubmit" class="space-y-4 md:space-y-6">
            <!-- Basic Info -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label class="block text-xs md:text-sm font-medium mb-2 md:mb-3" style="color: var(--ink-text);">
                  单词 *
                </label>
                <input
                  v-model="form.word"
                  type="text"
                  required
                  class="w-full px-4 md:px-5 py-3 md:py-4 rounded-xl border text-xs md:text-sm outline-none
                         transition-all duration-300 focus:border-[var(--ink-accent)] focus:shadow-lg"
                  style="background: var(--ink-bg); border-color: var(--ink-border);
                         color: var(--ink-text);"
                />
              </div>
              <div>
                <label class="block text-xs md:text-sm font-medium mb-2 md:mb-3" style="color: var(--ink-text);">
                  音标 *
                </label>
                <input
                  v-model="form.phonetic"
                  type="text"
                  required
                  placeholder="/həˈloʊ/"
                  class="w-full px-4 md:px-5 py-3 md:py-4 rounded-xl border text-xs md:text-sm outline-none
                         transition-all duration-300 focus:border-[var(--ink-accent)] focus:shadow-lg"
                  style="background: var(--ink-bg); border-color: var(--ink-border);
                         color: var(--ink-text);"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div>
                <label class="block text-xs md:text-sm font-medium mb-2 md:mb-3" style="color: var(--ink-text);">
                  词性
                </label>
                <AppSelect
                  v-model="form.partOfSpeech"
                  surface="base"
                  class="w-full"
                >
                  <option v-for="pos in partOfSpeechOptions" :key="pos" :value="pos">
                    {{ pos }}
                  </option>
                </AppSelect>
              </div>
              <div>
                <label class="block text-xs md:text-sm font-medium mb-2 md:mb-3" style="color: var(--ink-text);">
                  难度
                </label>
                <AppSelect
                  v-model="form.difficulty"
                  surface="base"
                  class="w-full"
                >
                  <option v-for="opt in difficultyOptions" :key="opt.value" :value="opt.value">
                    {{ opt.label }}
                  </option>
                </AppSelect>
              </div>
              <div>
                <label class="block text-xs md:text-sm font-medium mb-2 md:mb-3" style="color: var(--ink-text);">
                  分类
                </label>
                <AppSelect
                  v-model="form.category"
                  surface="base"
                  class="w-full"
                >
                  <option v-for="opt in categoryOptions" :key="opt.value" :value="opt.value">
                    {{ opt.label }}
                  </option>
                </AppSelect>
              </div>
            </div>

            <div>
              <label class="block text-xs md:text-sm font-medium mb-2 md:mb-3" style="color: var(--ink-text);">
                中文翻译 *
              </label>
              <input
                v-model="form.translation"
                type="text"
                required
                class="w-full px-4 md:px-5 py-3 md:py-4 rounded-xl border text-xs md:text-sm outline-none
                       transition-all duration-300 focus:border-[var(--ink-accent)] focus:shadow-lg"
                style="background: var(--ink-bg); border-color: var(--ink-border);
                       color: var(--ink-text);"
              />
            </div>

            <div>
              <label class="block text-xs md:text-sm font-medium mb-2 md:mb-3" style="color: var(--ink-text);">
                英文释义 *
              </label>
              <textarea
                v-model="form.definition"
                rows="3"
                required
                class="w-full px-4 md:px-5 py-3 md:py-4 rounded-xl border text-xs md:text-sm outline-none resize-none
                       transition-all duration-300 focus:border-[var(--ink-accent)] focus:shadow-lg"
                style="background: var(--ink-bg); border-color: var(--ink-border);
                       color: var(--ink-text);"
              ></textarea>
            </div>

            <!-- Phrases -->
            <div>
              <label class="block text-xs md:text-sm font-medium mb-2 md:mb-3" style="color: var(--ink-text);">
                常用词组
              </label>
              <div v-for="(phrase, index) in form.phrases" :key="index" class="flex flex-col md:flex-row gap-2 md:gap-3 mb-3">
                <input
                  v-model="phrase.phrase"
                  type="text"
                  placeholder="词组"
                  class="flex-1 px-3 md:px-4 py-2 md:py-3 rounded-lg border text-xs md:text-sm outline-none
                         transition-all duration-300 focus:border-[var(--ink-accent)]"
                  style="background: var(--ink-bg); border-color: var(--ink-border);
                         color: var(--ink-text);"
                />
                <input
                  v-model="phrase.translation"
                  type="text"
                  placeholder="翻译"
                  class="flex-1 px-3 md:px-4 py-2 md:py-3 rounded-lg border text-xs md:text-sm outline-none
                         transition-all duration-300 focus:border-[var(--ink-accent)]"
                  style="background: var(--ink-bg); border-color: var(--ink-border);
                         color: var(--ink-text);"
                />
                <button
                  type="button"
                  @click="removePhrase(index)"
                  class="px-3 md:px-4 py-2 md:py-3 rounded-lg text-red-400 hover:bg-red-500/10
                         transition-all duration-300 self-end md:self-auto"
                >
                  ✕
                </button>
              </div>
              <button
                type="button"
                @click="addPhrase"
                class="text-xs md:text-sm px-4 md:px-5 py-2 md:py-3 rounded-lg border transition-all duration-300
                       hover:bg-[var(--ink-accent)]/10"
                style="border-color: var(--ink-border); color: var(--ink-accent);"
              >
                + 添加词组
              </button>
            </div>

            <!-- Examples -->
            <div>
              <label class="block text-xs md:text-sm font-medium mb-2 md:mb-3" style="color: var(--ink-text);">
                例句
              </label>
              <div v-for="(example, index) in form.examples" :key="index" class="mb-4 p-3 md:p-5 rounded-xl border" style="border-color: var(--ink-border);">
                <textarea
                    v-model="example.sentence"
                    rows="2"
                    placeholder="英文例句"
                    class="flex-1 px-3 md:px-4 py-2 md:py-3 rounded-lg border text-xs md:text-sm outline-none resize-none
                           transition-all duration-300 focus:border-[var(--ink-accent)]"
                    style="width: 100%; background: var(--ink-bg); border-color: var(--ink-border);
                           color: var(--ink-text);"
                  ></textarea>
                <div class="flex flex-col md:flex-row gap-2 md:gap-3 mb-3">
                  <input
                  v-model="example.translation"
                  type="text"
                  placeholder="中文翻译"
                  class="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border text-xs md:text-sm outline-none
                         transition-all duration-300 focus:border-[var(--ink-accent)]"
                  style="background: var(--ink-bg); border-color: var(--ink-border);
                         color: var(--ink-text);"
                />
                  <button
                    type="button"
                    @click="removeExample(index)"
                    class="px-3 md:px-4 py-2 md:py-3 rounded-lg text-red-400 hover:bg-red-500/10
                           transition-all duration-300 self-end md:self-start"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <button
                type="button"
                @click="addExample"
                class="text-xs md:text-sm px-4 md:px-5 py-2 md:py-3 rounded-lg border transition-all duration-300
                       hover:bg-[var(--ink-accent)]/10"
                style="border-color: var(--ink-border); color: var(--ink-accent);"
              >
                + 添加例句
              </button>
            </div>

            <!-- Actions -->
            <div class="flex gap-3 md:gap-4 pt-4 md:pt-6">
              <button
                type="button"
                @click="closeModal"
                class="flex-1 py-3 md:py-4 rounded-xl font-medium text-xs md:text-sm border
                       transition-all duration-300 hover:bg-[var(--ink-accent)]/10"
                style="border-color: var(--ink-border); color: var(--ink-text);"
              >
                取消
              </button>
              <button
                type="submit"
                class="flex-1 py-3 md:py-4 rounded-xl font-bold text-xs md:text-sm
                       transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
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
          class="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl p-8"
          style="background: var(--ink-card-bg);"
        >
          <!-- Header -->
          <div class="flex items-start justify-between mb-8">
            <div>
              <div class="flex items-center gap-3 mb-3">
                <h3 class="text-4xl font-bold" style="color: var(--ink-text); font-family: var(--font-display);">
                  {{ selectedVocabulary.word }}
                </h3>
                <button
                  @click="playAudio(selectedVocabulary.word)"
                  class="p-2 rounded-lg transition-all duration-300 hover:bg-[var(--ink-accent)]/10"
                  :class="isSpeaking ? 'text-[var(--ink-accent)] animate-pulse' : ''"
                  style="color: var(--ink-text-muted);"
                  title="播放发音"
                >
                  🔊
                </button>
              </div>
              <p class="text-xl" style="color: var(--ink-accent);">
                {{ selectedVocabulary.phonetic }}
              </p>
            </div>
            <button
              @click="showDetailModal = false"
              class="p-3 rounded-lg hover:bg-[var(--ink-accent)]/10 transition-all duration-300"
              style="color: var(--ink-text-muted);"
            >
              ✕
            </button>
          </div>

          <!-- Tags -->
          <div class="flex flex-wrap gap-3 mb-8">
            <span
              class="px-4 py-2 rounded-full text-sm font-medium"
              style="background: var(--ink-accent)/20; color: var(--ink-accent);"
            >
              {{ selectedVocabulary.partOfSpeech }}
            </span>
            <span
              :class="getDifficultyColor(selectedVocabulary.difficulty)"
              class="px-4 py-2 rounded-full text-sm font-medium border"
            >
              {{ difficultyOptions.find(d => d.value === selectedVocabulary.difficulty)?.label }}
            </span>
            <span
              class="px-4 py-2 rounded-full text-sm font-medium"
              style="background: var(--ink-border); color: var(--ink-text-muted);"
            >
              {{ getCategoryLabel(selectedVocabulary.category) }}
            </span>
          </div>

          <!-- Translation & Definition -->
          <div class="mb-8">
            <h4 class="text-sm font-medium mb-3" style="color: var(--ink-accent);">中文翻译</h4>
            <p class="text-2xl font-bold mb-6" style="color: var(--ink-text);">
              {{ selectedVocabulary.translation }}
            </p>
            <h4 class="text-sm font-medium mb-3" style="color: var(--ink-accent);">英文释义</h4>
            <p class="text-lg leading-relaxed" style="color: var(--ink-text-muted);">
              {{ selectedVocabulary.definition }}
            </p>
          </div>

          <!-- Phrases -->
          <div v-if="selectedVocabulary.phrases.length" class="mb-8">
            <h4 class="text-sm font-medium mb-4" style="color: var(--ink-accent);">常用词组</h4>
            <div class="space-y-3">
              <div
                v-for="(phrase, index) in selectedVocabulary.phrases"
                :key="index"
                class="p-4 rounded-xl"
                style="background: var(--ink-bg);"
              >
                <p class="font-bold mb-2" style="color: var(--ink-text);">
                  {{ phrase.phrase }}
                </p>
                <p class="text-sm" style="color: var(--ink-text-muted);">
                  {{ phrase.translation }}
                </p>
              </div>
            </div>
          </div>

          <!-- Examples -->
          <div v-if="selectedVocabulary.examples.length" class="mb-8">
            <h4 class="text-sm font-medium mb-4" style="color: var(--ink-accent);">例句</h4>
            <div class="space-y-4">
              <div
                v-for="(example, index) in selectedVocabulary.examples"
                :key="index"
                class="p-5 rounded-xl"
                style="background: var(--ink-bg);"
              >
                <p class="mb-3 text-lg" style="color: var(--ink-text);">
                  {{ example.sentence }}
                </p>
                <p class="text-sm" style="color: var(--ink-text-muted);">
                  {{ example.translation }}
                </p>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-4 pt-6 border-t" style="border-color: var(--ink-border);">
            <button
              @click="handleToggleFavorite(selectedVocabulary)"
              class="flex-1 py-4 rounded-xl font-medium text-sm border
                     transition-all duration-300 hover:bg-[var(--ink-accent)]/10"
              :class="selectedVocabulary.isFavorite ? 'text-yellow-400' : ''"
              style="border-color: var(--ink-border); color: var(--ink-text);"
            >
              {{ selectedVocabulary.isFavorite ? '⭐ 已收藏' : '☆ 添加收藏' }}
            </button>
            <button
              @click="handleToggleMastered(selectedVocabulary)"
              class="flex-1 py-4 rounded-xl font-medium text-sm border
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
  </div>
</template>
