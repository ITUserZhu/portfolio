import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import VocabularyPage from '../views/VocabularyPage.vue';
import MemoryMode from '../views/MemoryMode.vue';
import LoginPage from '../views/LoginPage.vue';
import { useAuthStore } from '../stores/auth';
import { pinia } from '../stores/pinia';
import { resolveProtectedNavigation } from '../utils/authSession';

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
    component: VocabularyPage
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

// 路由守卫：进入受保护页面前先确认本地 token 仍然有效
router.beforeEach(async (to) => {
  const auth = useAuthStore(pinia);
  const redirect = await resolveProtectedNavigation({
    requiresAuth: !!to.meta.requiresAuth,
    hasToken: auth.hasToken,
    isValidated: auth.initialized,
    validateSession: () => auth.init(),
  });

  if (redirect) {
    return redirect;
  }
});

export default router;
