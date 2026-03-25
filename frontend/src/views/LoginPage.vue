<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const auth = useAuthStore();

const username = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);
const checking = ref(true);

// 页面加载时先检查是否已登录
onMounted(async () => {
  const valid = await auth.init();
  if (valid) {
    router.replace('/vocabulary');
  }
  checking.value = false;
});

async function handleLogin() {
  error.value = '';
  loading.value = true;
  try {
    await auth.login(username.value, password.value);
    router.replace('/vocabulary');
  } catch (err) {
    error.value = err.response?.data?.message || '登录失败，请重试';
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4" style="background: var(--ink-bg);">
    <!-- 检查中 -->
    <div v-if="checking" class="text-center">
      <div
        class="w-10 h-10 border-3 border-t-transparent rounded-full animate-spin mx-auto"
        style="border-color: var(--ink-accent); border-top-color: transparent;"
      ></div>
    </div>

    <!-- 登录表单 -->
    <div v-else class="w-full max-w-sm">
      <h1 class="text-3xl font-bold mb-2 text-center" style="color: var(--ink-text);">登录</h1>
      <p class="text-sm text-center mb-8" style="color: var(--ink-text-muted);">
        登录后可管理词汇数据
      </p>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <input
            v-model="username"
            type="text"
            placeholder="用户名"
            required
            autocomplete="username"
            class="w-full px-5 py-4 rounded-xl border text-sm outline-none transition-all duration-300
                   focus:border-[var(--ink-accent)] focus:shadow-lg"
            style="background: var(--ink-card-bg, var(--ink-card)); border-color: var(--ink-border);
                   color: var(--ink-text);"
          />
        </div>
        <div>
          <input
            v-model="password"
            type="password"
            placeholder="密码"
            required
            autocomplete="current-password"
            class="w-full px-5 py-4 rounded-xl border text-sm outline-none transition-all duration-300
                   focus:border-[var(--ink-accent)] focus:shadow-lg"
            style="background: var(--ink-card-bg, var(--ink-card)); border-color: var(--ink-border);
                   color: var(--ink-text);"
          />
        </div>

        <p v-if="error" class="text-sm text-red-500 text-center">{{ error }}</p>

        <button
          type="submit"
          :disabled="loading"
          class="w-full py-4 rounded-xl font-semibold text-white text-base transition-all duration-300
                 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          style="background: var(--ink-accent);"
        >
          {{ loading ? '登录中...' : '登录' }}
        </button>
      </form>
    </div>
  </div>
</template>
