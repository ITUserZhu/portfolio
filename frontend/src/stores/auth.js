import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api from '../api';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('auth_token') || '');
  const user = ref(null);

  const isLoggedIn = computed(() => !!token.value);

  // 设置 token 并持久化
  function setToken(t) {
    token.value = t;
    localStorage.setItem('auth_token', t);
    api.defaults.headers.common['Authorization'] = `Bearer ${t}`;
  }

  // 清除登录状态
  function clearAuth() {
    token.value = '';
    user.value = null;
    localStorage.removeItem('auth_token');
    delete api.defaults.headers.common['Authorization'];
  }

  // 初始化：从 localStorage 恢复 token 并验证
  async function init() {
    if (!token.value) return false;
    api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
    try {
      const res = await api.get('/auth/me');
      user.value = res.data;
      return true;
    } catch {
      clearAuth();
      return false;
    }
  }

  // 登录
  async function login(username, password) {
    const res = await api.post('/auth/login', { username, password });
    setToken(res.data.token);
    user.value = res.data.user;
    return res.data.user;
  }

  return { token, user, isLoggedIn, init, login, clearAuth };
});
