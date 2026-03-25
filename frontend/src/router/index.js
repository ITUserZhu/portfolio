import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import VocabularyPage from '../views/VocabularyPage.vue';
import MemoryMode from '../views/MemoryMode.vue';
import LoginPage from '../views/LoginPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/vocabulary',
    name: 'Vocabulary',
    component: VocabularyPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/vocabulary/memory',
    name: 'MemoryMode',
    component: MemoryMode,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      };
    }
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  }
});

// 路由守卫：需要认证的页面自动跳转登录
router.beforeEach((to) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      return { name: 'Login' };
    }
  }
});

export default router;
