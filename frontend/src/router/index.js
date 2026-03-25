import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import VocabularyPage from '../views/VocabularyPage.vue';
import MemoryMode from '../views/MemoryMode.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/vocabulary',
    name: 'Vocabulary',
    component: VocabularyPage
  },
  {
    path: '/vocabulary/memory',
    name: 'MemoryMode',
    component: MemoryMode
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

export default router;