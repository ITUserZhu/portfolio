<script setup>
import { onMounted } from 'vue';
import { useThemeStore } from './stores/theme';
import Navbar from './components/Navbar.vue';
import FooterSection from './components/Footer.vue';

const theme = useThemeStore();

onMounted(() => {
  theme.init();
});
</script>

<template>
  <div class="grain-overlay min-h-screen" style="background: var(--ink-bg);">
    <Navbar />
    <router-view />
    <FooterSection />
  </div>
</template>
