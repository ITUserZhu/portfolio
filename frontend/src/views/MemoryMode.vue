<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { getRandomBatch, toggleFavorite, toggleMastered } from '../api';
import { useSpeech } from '../composables/useSpeech';
import { useSwipe } from '../composables/useSwipe';
import AppSelect from '../components/AppSelect.vue';

const router = useRouter();
const { isSpeaking, isSupported, speak } = useSpeech();

// 筛选设置
const showSettings = ref(true);
const selectedCategory = ref('');
const selectedDifficulty = ref('');
const excludeMastered = ref(true);
const batchSize = 30;

const categoryOptions = [
  { value: '', label: '全部' },
  { value: 'daily', label: '日常' },
  { value: 'tech', label: '技术' },
  { value: 'business', label: '商务' },
  { value: 'academic', label: '学术' },
  { value: 'travel', label: '旅行' },
  { value: 'other', label: '其他' }
];
const difficultyOptions = [
  { value: '', label: '全部' },
  { value: 'beginner', label: '初级' },
  { value: 'intermediate', label: '中级' },
  { value: 'advanced', label: '高级' }
];

// 卡片数据
const words = ref([]);
const currentIndex = ref(0);
const isFlipped = ref(false);
const loading = ref(false);
const isAnimating = ref(false);
const animationClass = ref('');
const showGuide = ref(false);
const seenIds = new Set(); // 记录本轮已加载的单词 ID，防止跨批次重复

// 本轮统计
const sessionStats = ref({ mastered: 0, favorited: 0, total: 0 });

// 当前单词
const currentWord = computed(() => words.value[currentIndex.value] || null);
const progress = computed(() => `${currentIndex.value + 1} / ${words.value.length}`);
const hasNext = computed(() => currentIndex.value < words.value.length - 1);

// 手势
const cardRef = ref(null);
const justSwiped = ref(false);
const swipe = useSwipe(null, {
  onSwipeUp: () => { 
    // 只有在卡片正面（未翻转）时才允许滑动
    if (!isFlipped.value) {
      justSwiped.value = true; 
      handleNext(); 
    }
  },
  onSwipeLeft: () => { 
    // 只有在卡片正面（未翻转）时才允许滑动
    if (!isFlipped.value) {
      justSwiped.value = true; 
      handleMastered(); 
    }
  },
  onSwipeRight: () => { 
    // 只有在卡片正面（未翻转）时才允许滑动
    if (!isFlipped.value) {
      justSwiped.value = true; 
      handleFavorite(); 
    }
  },
});

onMounted(() => {
  // 检查是否首次使用
  if (!localStorage.getItem('memory-guide-seen')) {
    showGuide.value = true;
  }
});

onUnmounted(() => {
  if (cardRef.value) {
    swipe.unbindEvents(cardRef.value);
  }
});

function bindCard() {
  nextTick(() => {
    if (cardRef.value) {
      swipe.unbindEvents(cardRef.value);
      swipe.bindEvents(cardRef.value);
    }
  });
}

// 加载一批单词
async function loadBatch() {
  loading.value = true;
  try {
    const params = { size: batchSize };
    if (selectedCategory.value) params.category = selectedCategory.value;
    if (selectedDifficulty.value) params.difficulty = selectedDifficulty.value;
    if (excludeMastered.value) params.excludeMastered = 'true';

    const res = await getRandomBatch(params);
    if (res.data && res.data.length > 0) {
      // 过滤掉本轮已出现过的单词，防止重复
      const newWords = res.data.filter(w => !seenIds.has(w._id));
      newWords.forEach(w => seenIds.add(w._id));
      const shuffled = newWords.sort(() => Math.random() - 0.5);
      words.value.push(...shuffled);
    }
  } catch (err) {
    console.error('加载失败:', err);
  } finally {
    loading.value = false;
  }
}

// 开始记忆
async function startMemory() {
  words.value = [];
  currentIndex.value = 0;
  isFlipped.value = false;
  seenIds.clear();
  sessionStats.value = { mastered: 0, favorited: 0, total: 0 };
  await loadBatch();
  if (words.value.length > 0) {
    showSettings.value = false;
    sessionStats.value.total = words.value.length;
    bindCard();
  }
}

// 翻转卡片
function flipCard() {
  if (isAnimating.value) return;
  isFlipped.value = !isFlipped.value;
}

// 卡片点击（排除滑动后触发的 click）
function handleCardClick() {
  if (justSwiped.value) {
    justSwiped.value = false;
    return;
  }
  flipCard();
}

// 卡片飞出动画
function animateOut(direction) {
  return new Promise((resolve) => {
    if (isAnimating.value) return resolve();
    isAnimating.value = true;
    animationClass.value = `fly-${direction}`;
    setTimeout(() => {
      animationClass.value = '';
      isAnimating.value = false;
      isFlipped.value = false;
      resolve();
    }, 400);
  });
}

// 下一个
async function handleNext() {
  if (isAnimating.value) return;
  await animateOut('up');

  // 预加载：当前批次剩余 ≤ 3 个时加载下一批
  if (words.value.length - currentIndex.value <= 4) {
    loadBatch();
  }

  if (hasNext.value) {
    currentIndex.value++;
    // 重置卡片背面的滚动位置到顶部
    nextTick(() => {
      if (cardRef.value) {
        const cardBack = cardRef.value.querySelector('.card-back');
        if (cardBack) {
          cardBack.scrollTop = 0;
        }
      }
    });
    bindCard();
  }
}

// 标记已掌握（只标记，不取消）
async function handleMastered() {
  if (isAnimating.value || !currentWord.value) return;
  if (!currentWord.value.isMastered) {
    try {
      await toggleMastered(currentWord.value._id);
      currentWord.value.isMastered = true;
      sessionStats.value.mastered++;
    } catch (err) {
      console.error('操作失败:', err);
    }
  }
  await animateOut('left');
  if (hasNext.value) {
    currentIndex.value++;
    // 重置卡片背面的滚动位置到顶部
    nextTick(() => {
      if (cardRef.value) {
        const cardBack = cardRef.value.querySelector('.card-back');
        if (cardBack) {
          cardBack.scrollTop = 0;
        }
      }
    });
    bindCard();
  }
}

// 收藏（只收藏，不取消）
async function handleFavorite() {
  if (isAnimating.value || !currentWord.value) return;
  if (!currentWord.value.isFavorite) {
    try {
      await toggleFavorite(currentWord.value._id);
      currentWord.value.isFavorite = true;
      sessionStats.value.favorited++;
    } catch (err) {
      console.error('操作失败:', err);
    }
  }
  await animateOut('right');
  if (hasNext.value) {
    currentIndex.value++;
    // 重置卡片背面的滚动位置到顶部
    nextTick(() => {
      if (cardRef.value) {
        const cardBack = cardRef.value.querySelector('.card-back');
        if (cardBack) {
          cardBack.scrollTop = 0;
        }
      }
    });
    bindCard();
  }
}

// 发音
function playAudio() {
  if (currentWord.value) {
    speak(currentWord.value.word);
  }
}

// 关闭引导
function dismissGuide() {
  showGuide.value = false;
  localStorage.setItem('memory-guide-seen', 'true');
}

// 返回词汇页
function goBack() {
  router.push('/vocabulary');
}

// 难度标签颜色
function difficultyColor(d) {
  if (d === 'beginner') return '#22c55e';
  if (d === 'intermediate') return '#f59e0b';
  return '#ef4444';
}
function difficultyLabel(d) {
  if (d === 'beginner') return '初级';
  if (d === 'intermediate') return '中级';
  return '高级';
}
function categoryLabel(c) {
  const map = { daily: '日常', tech: '技术', business: '商务', academic: '学术', travel: '旅行', other: '其他' };
  return map[c] || c;
}
</script>

<template>
  <div class="fixed inset-0 z-40 overflow-hidden" style="background: var(--ink-bg); color: var(--ink-text);">

    <!-- 筛选设置页 -->
    <div v-if="showSettings" class="flex items-center justify-center h-full px-4">
      <div class="w-full max-w-md">
        <button
          @click="goBack"
          class="mb-8 flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition-opacity"
        >
          <span class="text-lg">&larr;</span> 返回词汇页
        </button>

        <h1 class="text-3xl font-bold mb-2">记忆模式</h1>
        <p class="text-sm opacity-60 mb-8">选择你想复习的范围，开始高效记忆</p>

        <div class="space-y-5">
          <div>
            <label class="block text-sm font-medium mb-2 opacity-80">分类</label>
            <AppSelect
              v-model="selectedCategory"
              class="w-full"
            >
              <option v-for="opt in categoryOptions" :key="opt.value" :value="opt.value">
                {{ opt.label }}
              </option>
            </AppSelect>
          </div>

          <div>
            <label class="block text-sm font-medium mb-2 opacity-80">难度</label>
            <AppSelect
              v-model="selectedDifficulty"
              class="w-full"
            >
              <option v-for="opt in difficultyOptions" :key="opt.value" :value="opt.value">
                {{ opt.label }}
              </option>
            </AppSelect>
          </div>

          <label class="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              v-model="excludeMastered"
              class="w-5 h-5 rounded accent-[var(--ink-accent)]"
            />
            <span class="text-sm">排除已掌握的单词</span>
          </label>
        </div>

        <button
          @click="startMemory"
          :disabled="loading"
          class="w-full mt-8 py-4 rounded-xl font-semibold text-white text-base
                 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          style="background: var(--ink-accent);"
        >
          {{ loading ? '加载中...' : '开始记忆' }}
        </button>
      </div>
    </div>

    <!-- 记忆模式主界面 -->
    <div v-else class="flex flex-col h-screen max-w-lg mx-auto px-4 select-none">

      <!-- 顶部栏 -->
      <div class="pt-4 pb-2">
        <div class="flex items-center justify-between mb-3">
          <button
            @click="showSettings = true"
            class="flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition-opacity"
          >
            <span class="text-lg">&larr;</span> 返回
          </button>
          <span class="text-sm font-medium opacity-60">记忆模式</span>
          <button
            @click="showGuide = true"
            class="text-sm opacity-40 hover:opacity-80 transition-opacity"
          >?</button>
        </div>

        <!-- 进度条 -->
        <div class="w-full h-1.5 rounded-full overflow-hidden" style="background: var(--ink-border);">
          <div
            class="h-full rounded-full transition-all duration-500"
            style="background: var(--ink-accent);"
            :style="{ width: words.length > 0 ? ((currentIndex + 1) / words.length * 100) + '%' : '0%' }"
          ></div>
        </div>

        <!-- 统计 -->
        <div class="flex items-center justify-between mt-2 text-xs opacity-60">
          <span>{{ progress }}</span>
          <div class="flex gap-4">
            <span style="color: #22c55e;">已掌握 {{ sessionStats.mastered }}</span>
            <span style="color: #f59e0b;">已收藏 {{ sessionStats.favorited }}</span>
          </div>
        </div>
      </div>

      <!-- 卡片区 -->
      <div class="flex-1 flex items-center justify-center py-4" v-if="currentWord">
        <div
          ref="cardRef"
          @click="handleCardClick"
          class="card-container w-full aspect-[3/4] max-h-[65vh] cursor-pointer"
          :class="[animationClass, { 'is-flipped': isFlipped }]"
        >
          <div class="card-inner">
            <!-- 正面 -->
            <div
              class="card-face card-front rounded-2xl p-8 flex flex-col items-center justify-center
                     border shadow-lg"
              style="background: var(--ink-card); border-color: var(--ink-border);"
            >
              <!-- 标签 -->
              <div class="flex gap-2 mb-6">
                <span
                  class="px-3 py-1 rounded-full text-xs font-medium text-white"
                  :style="{ background: difficultyColor(currentWord.difficulty) }"
                >{{ difficultyLabel(currentWord.difficulty) }}</span>
                <span
                  class="px-3 py-1 rounded-full text-xs font-medium"
                  style="background: var(--ink-border); color: var(--ink-text);"
                >{{ categoryLabel(currentWord.category) }}</span>
                <span
                  class="px-3 py-1 rounded-full text-xs font-medium"
                  style="background: var(--ink-border); color: var(--ink-text);"
                >{{ currentWord.partOfSpeech }}</span>
              </div>

              <!-- 单词 -->
              <h2 class="text-4xl font-bold mb-3 text-center">{{ currentWord.word }}</h2>

              <!-- 音标 -->
              <p class="text-lg opacity-50 mb-6">{{ currentWord.phonetic }}</p>

              <!-- 发音按钮 -->
              <button
                v-if="isSupported"
                @click.stop="playAudio"
                class="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300
                       hover:scale-110 active:scale-95"
                :class="{ 'animate-pulse': isSpeaking }"
                style="background: var(--ink-accent); color: white;"
              >
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                </svg>
              </button>

              <!-- 提示 -->
              <p class="mt-8 text-xs opacity-30">点击卡片查看释义</p>
            </div>

            <!-- 背面 -->
            <div
              class="card-face card-back rounded-2xl p-8 overflow-y-auto
                     border shadow-lg"
              style="background: var(--ink-card); border-color: var(--ink-border);"
            >
              <!-- 单词（小号） -->
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-xl font-bold">{{ currentWord.word }}</h3>
                <button
                  v-if="isSupported"
                  @click.stop="playAudio"
                  class="w-8 h-8 rounded-full flex items-center justify-center transition-all
                         hover:scale-110"
                  style="background: var(--ink-accent); color: white;"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                  </svg>
                </button>
              </div>

              <!-- 翻译 -->
              <div class="mb-5 p-4 rounded-xl" style="background: var(--ink-bg);">
                <p class="text-lg font-semibold" style="color: var(--ink-accent);">
                  {{ currentWord.translation }}
                </p>
              </div>

              <!-- 英文释义 -->
              <div class="mb-5">
                <p class="text-xs font-medium opacity-50 mb-1">English Definition</p>
                <p class="text-sm leading-relaxed">{{ currentWord.definition }}</p>
              </div>

              <!-- 例句 -->
              <div v-if="currentWord.examples && currentWord.examples.length > 0" class="mb-5">
                <p class="text-xs font-medium opacity-50 mb-2">Examples</p>
                <div
                  v-for="(ex, i) in currentWord.examples"
                  :key="i"
                  class="mb-2 p-3 rounded-lg text-sm"
                  style="background: var(--ink-bg);"
                >
                  <p class="italic">{{ ex.sentence }}</p>
                  <p class="opacity-60 mt-1">{{ ex.translation }}</p>
                </div>
              </div>

              <!-- 短语 -->
              <div v-if="currentWord.phrases && currentWord.phrases.length > 0">
                <p class="text-xs font-medium opacity-50 mb-2">Phrases</p>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="(ph, i) in currentWord.phrases"
                    :key="i"
                    class="px-3 py-1.5 rounded-lg text-xs"
                    style="background: var(--ink-bg);"
                  >{{ ph.phrase }} — {{ ph.translation }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-else class="flex-1 flex items-center justify-center">
        <div class="text-center">
          <p class="text-lg font-medium mb-2">没有更多单词了</p>
          <p class="text-sm opacity-50 mb-6">当前范围内的单词已全部学习</p>
          <button
            @click="showSettings = true"
            class="px-6 py-3 rounded-xl font-medium text-white transition-all hover:scale-105"
            style="background: var(--ink-accent);"
          >调整范围重新开始</button>
        </div>
      </div>

      <!-- 底部操作栏 -->
      <div v-if="currentWord" class="pb-6 pt-2">
        <div class="flex items-center justify-center gap-4">
          <button
            @click="flipCard"
            class="flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all
                   hover:bg-[var(--ink-border)]/30 active:scale-95"
          >
            <svg class="w-6 h-6 opacity-60" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"/>
            </svg>
            <span class="text-xs opacity-50">翻转</span>
          </button>

          <button
            @click="handleFavorite"
            class="flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all
                   hover:bg-yellow-500/10 active:scale-95"
            :style="{ color: currentWord?.isFavorite ? '#f59e0b' : 'inherit' }"
          >
            <svg class="w-6 h-6" :fill="currentWord?.isFavorite ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>
            </svg>
            <span class="text-xs opacity-50">收藏</span>
          </button>

          <button
            @click="handleMastered"
            class="flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all
                   hover:bg-green-500/10 active:scale-95"
            :style="{ color: currentWord?.isMastered ? '#22c55e' : 'inherit' }"
          >
            <svg class="w-6 h-6" :fill="currentWord?.isMastered ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span class="text-xs opacity-50">掌握</span>
          </button>

          <button
            @click="handleNext"
            class="flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all
                   hover:bg-[var(--ink-accent)]/10 active:scale-95"
            style="color: var(--ink-accent);"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5"/>
            </svg>
            <span class="text-xs opacity-50">下一个</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 手势引导遮罩 -->
    <Teleport to="body">
      <div
        v-if="showGuide && !showSettings"
        @click="dismissGuide"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      >
        <div class="text-center text-white px-8 max-w-sm">
          <h3 class="text-xl font-bold mb-8">手势操作</h3>

          <div class="space-y-6">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5"/>
                </svg>
              </div>
              <div class="text-left">
                <p class="font-medium">上滑</p>
                <p class="text-sm opacity-60">下一个单词</p>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-green-500/30 flex items-center justify-center">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
                </svg>
              </div>
              <div class="text-left">
                <p class="font-medium" style="color: #22c55e;">左滑</p>
                <p class="text-sm opacity-60">标记已掌握</p>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-yellow-500/30 flex items-center justify-center">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
                </svg>
              </div>
              <div class="text-left">
                <p class="font-medium" style="color: #f59e0b;">右滑</p>
                <p class="text-sm opacity-60">收藏单词</p>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59"/>
                </svg>
              </div>
              <div class="text-left">
                <p class="font-medium">点击</p>
                <p class="text-sm opacity-60">翻转卡片查看释义</p>
              </div>
            </div>
          </div>

          <p class="mt-8 text-sm opacity-40">点击任意位置关闭</p>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
/* 卡片翻转 */
.card-container {
  perspective: 1200px;
  transition: transform 0.4s ease, opacity 0.4s ease;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}

.card-container.is-flipped .card-inner {
  transform: rotateY(180deg);
}

.card-face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.card-back {
  transform: rotateY(180deg);
}

/* 飞出动画 */
.fly-up {
  transform: translateY(-120%) rotate(-5deg);
  opacity: 0;
}

.fly-left {
  transform: translateX(-120%) rotate(-15deg);
  opacity: 0;
}

.fly-right {
  transform: translateX(120%) rotate(15deg);
  opacity: 0;
}
</style>
