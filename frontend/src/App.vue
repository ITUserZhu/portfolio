<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useThemeStore } from './stores/theme';
import { useAuthStore } from './stores/auth';
import Navbar from './components/Navbar.vue';
import FooterSection from './components/Footer.vue';
import GlobalDialog from './components/GlobalDialog.vue';
import GlobalToast from './components/GlobalToast.vue';

const theme = useThemeStore();
const auth = useAuthStore();
const route = useRoute();

const showLayout = computed(() =>
  route.path !== '/vocabulary/memory' && route.path !== '/login'
);

onMounted(() => {
  theme.init();
  auth.init();
});
</script>

<template>
  <div class="grain-overlay min-h-screen" style="background: var(--ink-bg);">
    <Navbar v-if="showLayout" />
    <router-view />
    <FooterSection v-if="showLayout" />
    <GlobalDialog />
    <GlobalToast />
  </div>
</template>
