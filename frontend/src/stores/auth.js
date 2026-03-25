import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api from '../api';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('auth_token') || '');
  const user = ref(null);
  const initialized = ref(false);
  let initPromise = null;

  const hasToken = computed(() => !!token.value);
  const isLoggedIn = computed(() => hasToken.value && !!user.value);

  // 设置 token 并持久化
  function setToken(t) {
    token.value = t;
    localStorage.setItem('auth_token', t);
    api.defaults.headers.common['Authorization'] = `Bearer ${t}`;
    initialized.value = false;
  }

  // 清除登录状态
  function clearAuth() {
    token.value = '';
    user.value = null;
    localStorage.removeItem('auth_token');
    delete api.defaults.headers.common['Authorization'];
    initialized.value = true;
  }

  // 初始化：从 localStorage 恢复 token 并验证
  async function init() {
    if (initialized.value) {
      return isLoggedIn.value;
    }

    if (!token.value) {
      clearAuth();
      return false;
    }

    if (initPromise) {
      return initPromise;
    }

    api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;

    initPromise = (async () => {
      try {
        const res = await api.get('/auth/me');
        user.value = res.data;
        initialized.value = true;
        return true;
      } catch {
        clearAuth();
        return false;
      } finally {
        initPromise = null;
      }
    })();

    return initPromise;
  }

  // 登录
  async function login(username, password) {
    const res = await api.post('/auth/login', { username, password });
    setToken(res.data.token);
    user.value = res.data.user;
    initialized.value = true;
    return res.data.user;
  }

  return { token, user, initialized, hasToken, isLoggedIn, init, login, clearAuth };
});
