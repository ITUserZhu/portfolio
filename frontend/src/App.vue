<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useThemeStore } from './stores/theme';
import Navbar from './components/Navbar.vue';
import FooterSection from './components/Footer.vue';

const theme = useThemeStore();
const route = useRoute();

const showLayout = computed(() => route.path !== '/vocabulary/memory');

onMounted(() => {
  theme.init();
});
</script>

<template>
  <div class="grain-overlay min-h-screen" style="background: var(--ink-bg);">
    <Navbar v-if="showLayout" />
    <router-view />
    <FooterSection v-if="showLayout" />
  </div>
</template>
