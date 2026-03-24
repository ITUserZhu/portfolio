<script setup>
import { usePortfolioStore } from '../stores/portfolio';
import { computed } from 'vue';

const store = usePortfolioStore();
const profile = computed(() => store.profile);
</script>

<template>
  <section
    id="hero"
    class="relative min-h-screen flex items-center justify-center overflow-hidden"
    style="background: var(--ink-bg);"
  >
    <!-- Decorative Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <!-- Large decorative circle -->
      <div
        class="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.04]"
        style="background: var(--ink-accent); filter: blur(80px);"
      />
      <!-- Grid lines -->
      <div
        class="absolute inset-0 opacity-[0.03]"
        style="background-image:
          linear-gradient(var(--ink-text) 1px, transparent 1px),
          linear-gradient(90deg, var(--ink-text) 1px, transparent 1px);
          background-size: 80px 80px;"
      />
      <!-- Diagonal accent line -->
      <div
        class="absolute top-1/4 -left-20 w-[600px] h-px rotate-[35deg] opacity-20"
        style="background: linear-gradient(90deg, transparent, var(--ink-accent), transparent);"
      />
      <div
        class="absolute bottom-1/3 -right-20 w-[400px] h-px -rotate-[25deg] opacity-15"
        style="background: linear-gradient(90deg, transparent, var(--ink-accent), transparent);"
      />
    </div>

    <div class="relative z-10 max-w-5xl mx-auto px-6 text-center">
      <!-- Overline -->
      <div
        class="reveal inline-flex items-center gap-3 mb-8"
      >
        <span class="w-8 h-px" style="background: var(--ink-accent);"></span>
        <span
          class="text-xs tracking-[0.3em] uppercase font-medium"
          style="color: var(--ink-accent); font-family: var(--font-body);"
        >
          Portfolio 2025
        </span>
        <span class="w-8 h-px" style="background: var(--ink-accent);"></span>
      </div>

      <!-- Main Heading -->
      <h1
        class="reveal reveal-delay-1 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6"
        style="color: var(--ink-text); font-family: var(--font-display);"
      >
        <span class="block">Creative</span>
        <span class="block" style="color: var(--ink-accent);">
          <em>Developer</em>
        </span>
        <span class="block">&amp; Designer</span>
      </h1>

      <!-- Subtitle -->
      <p
        v-if="profile"
        class="reveal reveal-delay-2 max-w-xl mx-auto text-lg md:text-xl leading-relaxed mb-10"
        style="color: var(--ink-text-muted); font-family: var(--font-body);"
      >
        {{ profile.bio }}
      </p>
      <p
        v-else
        class="reveal reveal-delay-2 max-w-xl mx-auto text-lg md:text-xl leading-relaxed mb-10"
        style="color: var(--ink-text-muted); font-family: var(--font-body);"
      >
        热衷于用代码创造美好体验的全栈开发者
      </p>

      <!-- CTA Buttons -->
      <div class="reveal reveal-delay-3 flex flex-wrap items-center justify-center gap-4">
        <a
          href="#projects"
          @click.prevent="document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })"
          class="group px-8 py-3.5 rounded-full font-medium text-sm tracking-wide transition-all duration-300
                 hover:shadow-lg hover:shadow-[var(--ink-accent)]/20 hover:-translate-y-0.5"
          style="background: var(--ink-accent); color: var(--ink-bg); font-family: var(--font-body);"
        >
          探索项目
          <span class="inline-block ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
        <a
          href="#contact"
          @click.prevent="document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })"
          class="px-8 py-3.5 rounded-full font-medium text-sm tracking-wide transition-all duration-300
                 border hover:-translate-y-0.5"
          style="color: var(--ink-text); border-color: var(--ink-border); font-family: var(--font-body);"
        >
          联系我
        </a>
      </div>

      <!-- Stats -->
      <div
        v-if="profile"
        class="reveal reveal-delay-4 mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto"
      >
        <div v-for="(value, key) in profile.stats" :key="key" class="text-center">
          <div
            class="text-3xl md:text-4xl font-bold mb-1"
            style="color: var(--ink-accent); font-family: var(--font-display);"
          >
            {{ value }}
          </div>
          <div
            class="text-xs tracking-wider uppercase"
            style="color: var(--ink-text-muted); font-family: var(--font-body);"
          >
            {{ key === 'yearsExp' ? '年经验' : key === 'projects' ? '项目' : key === 'clients' ? '客户' : '咖啡' }}
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 reveal reveal-delay-5">
      <span
        class="text-xs tracking-widest uppercase"
        style="color: var(--ink-text-muted); font-family: var(--font-body);"
      >
        Scroll
      </span>
      <div
        class="w-px h-8 animate-pulse"
        style="background: var(--ink-accent);"
      />
    </div>
  </section>
</template>
