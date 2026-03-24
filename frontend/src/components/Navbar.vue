<script setup>
import { ref, onMounted } from 'vue';
import { useThemeStore } from '../stores/theme';

const theme = useThemeStore();
const scrolled = ref(false);
const mobileOpen = ref(false);

const navLinks = [
  { label: '首页', href: '#hero' },
  { label: '技能', href: '#skills' },
  { label: '项目', href: '#projects' },
  { label: '关于', href: '#about' },
  { label: '联系', href: '#contact' },
];

function scrollTo(href) {
  mobileOpen.value = false;
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

onMounted(() => {
  window.addEventListener('scroll', () => {
    scrolled.value = window.scrollY > 20;
  });
});
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="scrolled
      ? 'py-3 backdrop-blur-xl bg-[var(--ink-bg)]/80 border-b border-[var(--ink-border)]'
      : 'py-5 bg-transparent'"
  >
    <div class="max-w-6xl mx-auto px-6 flex items-center justify-between">
      <!-- Logo -->
      <a
        href="#hero"
        @click.prevent="scrollTo('#hero')"
        class="font-display text-2xl font-bold tracking-tight"
        style="color: var(--ink-accent); font-family: var(--font-display);"
      >
        Juleon<span style="color: var(--ink-text);">.</span>Z
      </a>

      <!-- Desktop Nav -->
      <div class="hidden md:flex items-center gap-1">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          @click.prevent="scrollTo(link.href)"
          class="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300
                 hover:bg-[var(--ink-accent)]/10"
          style="color: var(--ink-text-muted); font-family: var(--font-body);"
        >
          {{ link.label }}
        </a>
      </div>

      <div class="flex items-center gap-3">
        <!-- Theme Toggle -->
        <button
          @click="theme.toggle()"
          class="relative w-12 h-7 rounded-full transition-all duration-500 flex items-center"
          :class="theme.isDark ? 'bg-[var(--ink-accent)]' : 'bg-[var(--ink-border)]'"
          aria-label="切换主题"
        >
          <span
            class="absolute w-5 h-5 rounded-full bg-white shadow-md transition-all duration-500 flex items-center justify-center text-xs"
            :class="theme.isDark ? 'left-6' : 'left-1'"
          >
            {{ theme.isDark ? '🌙' : '☀️' }}
          </span>
        </button>

        <!-- Mobile Menu Toggle -->
        <button
          @click="mobileOpen = !mobileOpen"
          class="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="菜单"
        >
          <span
            class="block w-5 h-0.5 transition-all duration-300"
            :class="mobileOpen ? 'rotate-45 translate-y-2' : ''"
            style="background: var(--ink-text);"
          />
          <span
            class="block w-5 h-0.5 transition-all duration-300"
            :class="mobileOpen ? 'opacity-0' : ''"
            style="background: var(--ink-text);"
          />
          <span
            class="block w-5 h-0.5 transition-all duration-300"
            :class="mobileOpen ? '-rotate-45 -translate-y-2' : ''"
            style="background: var(--ink-text);"
          />
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0 -translate-y-4"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="mobileOpen"
        class="md:hidden absolute top-full left-0 right-0 backdrop-blur-xl border-b border-[var(--ink-border)] py-4"
        style="background: var(--ink-bg);"
      >
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          @click.prevent="scrollTo(link.href)"
          class="block px-6 py-3 text-base font-medium transition-colors"
          style="color: var(--ink-text-muted);"
        >
          {{ link.label }}
        </a>
      </div>
    </transition>
  </nav>
</template>
