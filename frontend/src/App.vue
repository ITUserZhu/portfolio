<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue';
import { useThemeStore } from './stores/theme';
import { usePortfolioStore } from './stores/portfolio';
import Navbar from './components/Navbar.vue';
import Hero from './components/Hero.vue';
import Skills from './components/Skills.vue';
import Projects from './components/Projects.vue';
import About from './components/About.vue';
import Contact from './components/Contact.vue';
import FooterSection from './components/Footer.vue';

const theme = useThemeStore();
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
  theme.init();

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

  await portfolio.fetchAll();
  await nextTick();
  scanAndObserve(document);
});

onUnmounted(() => {
  intersectionObserver?.disconnect();
  mutationObserver?.disconnect();
});
</script>

<template>
  <div class="grain-overlay min-h-screen" style="background: var(--ink-bg);">
    <Navbar />
    <main>
      <Hero />
      <Skills />
      <Projects />
      <About />
      <Contact />
    </main>
    <FooterSection />
  </div>
</template>
