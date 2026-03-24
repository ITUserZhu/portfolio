<script setup>
import { onMounted, onUnmounted, nextTick, defineAsyncComponent } from 'vue';
import { usePortfolioStore } from '../stores/portfolio';
import Hero from '../components/Hero.vue';

// 懒加载非首屏组件
const Skills = defineAsyncComponent(() => import('../components/Skills.vue'));
const Projects = defineAsyncComponent(() => import('../components/Projects.vue'));
const About = defineAsyncComponent(() => import('../components/About.vue'));
const Contact = defineAsyncComponent(() => import('../components/Contact.vue'));

const portfolio = usePortfolioStore();

let intersectionObserver = null;
let mutationObserver = null;

function observeElement(el) {
  if (!el.classList.contains('visible')) {
    intersectionObserver.observe(el);
  }
}

function scanAndObserve(root) {
  root.querySelectorAll('.reveal, .stagger-children').forEach(observeElement);
}

onMounted(async () => {
  intersectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  // Watch for dynamically added .reveal elements
  mutationObserver = new MutationObserver((mutations) => {
    for (const m of mutations) {
      for (const node of m.addedNodes) {
        if (node.nodeType === 1) {
          if (node.matches?.('.reveal, .stagger-children')) observeElement(node);
          scanAndObserve(node);
        }
      }
    }
  });
  mutationObserver.observe(document.body, { childList: true, subtree: true });

  // 加载首页必需的数据（包括技能和项目数据）
  try {
    await portfolio.fetchAll();
  } catch (e) {
    console.error('Failed to fetch portfolio data:', e);
  }
  
  await nextTick();
  scanAndObserve(document);
});

onUnmounted(() => {
  intersectionObserver?.disconnect();
  mutationObserver?.disconnect();
});
</script>

<template>
  <main>
    <Hero />
    <Skills />
    <Projects />
    <About />
    <Contact />
  </main>
</template>
