<script setup>
import { usePortfolioStore } from '../stores/portfolio';
import { computed } from 'vue';

const store = usePortfolioStore();
const profile = computed(() => store.profile);

const timeline = [
  { year: '2024', title: '高级全栈工程师', desc: '负责核心业务系统架构设计与团队技术管理' },
  { year: '2022', title: '全栈开发工程师', desc: '参与多个大型项目的前后端开发与优化' },
  { year: '2020', title: '前端开发工程师', desc: '专注于前端工程化与用户体验优化' },
  { year: '2017', title: '前端开发', desc: '进入公司开始实习' },
];
</script>

<template>
  <section
    id="about"
    class="relative py-24 md:py-32 overflow-hidden"
    style="background: var(--ink-bg-secondary);"
  >
    <div
      class="absolute top-0 left-0 right-0 h-px"
      style="background: linear-gradient(90deg, transparent, var(--ink-accent), transparent);"
    />

    <div class="max-w-6xl mx-auto px-6">
      <!-- Section Header -->
      <div class="reveal text-center mb-16">
        <span
          class="text-xs tracking-[0.3em] uppercase font-medium"
          style="color: var(--ink-accent); font-family: var(--font-body);"
        >
          About Me
        </span>
        <h2
          class="text-4xl md:text-5xl font-bold mt-3 mb-4"
          style="color: var(--ink-text); font-family: var(--font-display);"
        >
          关于<em>我</em>
        </h2>
        <div class="section-divider mx-auto"></div>
      </div>

      <div class="grid md:grid-cols-2 gap-16 items-start">
        <!-- Left: Bio -->
        <div class="reveal reveal-delay-1">
          <div
            class="relative w-48 h-48 md:w-64 md:h-64 mx-auto md:mx-0 mb-8 rounded-2xl overflow-hidden
                   border-2"
            style="border-color: var(--ink-accent);"
          >
            <img
              v-if="profile"
              :src="profile.avatar"
              :alt="profile.name"
              class="w-full h-full object-cover"
            />
            <!-- Decorative corner -->
            <div
              class="absolute -bottom-1 -right-1 w-8 h-8"
              style="background: var(--ink-accent);"
            />
          </div>

          <h3
            class="text-2xl font-bold mb-2"
            style="color: var(--ink-text); font-family: var(--font-display);"
          >
            {{ profile?.name || 'Alex Chen' }}
          </h3>
          <p
            class="text-sm mb-1"
            style="color: var(--ink-accent); font-family: var(--font-body);"
          >
            {{ profile?.title || '全栈开发工程师' }}
          </p>
          <p
            class="text-sm mb-6"
            style="color: var(--ink-text-muted); font-family: var(--font-body);"
          >
            📍 {{ profile?.location || '中国 · 深圳' }}
          </p>
          <p
            class="text-base leading-relaxed"
            style="color: var(--ink-text-muted); font-family: var(--font-body);"
          >
            {{ profile?.bio || '' }}
            我相信好的代码不仅仅是实现功能，更是一种艺术表达。在工作之余，我热衷于探索新技术、参与开源社区，并通过博客和社区分享我的经验和见解。
          </p>

          <!-- Social Links -->
          <div class="flex items-center gap-4 mt-8">
            <a
              :href="profile?.github || '#'"
              target="_blank"
              rel="noopener"
              class="w-10 h-10 rounded-full border flex items-center justify-center
                     transition-all duration-300 hover:-translate-y-1 hover:border-[var(--ink-accent)]
                     hover:text-[var(--ink-accent)]"
              style="border-color: var(--ink-border); color: var(--ink-text-muted);"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a
              :href="profile?.linkedin || '#'"
              target="_blank"
              rel="noopener"
              class="w-10 h-10 rounded-full border flex items-center justify-center
                     transition-all duration-300 hover:-translate-y-1 hover:border-[var(--ink-accent)]
                     hover:text-[var(--ink-accent)]"
              style="border-color: var(--ink-border); color: var(--ink-text-muted);"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a
              :href="`mailto:${profile?.email || 'alex@example.com'}`"
              class="w-10 h-10 rounded-full border flex items-center justify-center
                     transition-all duration-300 hover:-translate-y-1 hover:border-[var(--ink-accent)]
                     hover:text-[var(--ink-accent)]"
              style="border-color: var(--ink-border); color: var(--ink-text-muted);"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </a>
          </div>
        </div>

        <!-- Right: Timeline -->
        <div class="reveal reveal-delay-2">
          <h3
            class="text-lg font-semibold mb-8"
            style="color: var(--ink-text); font-family: var(--font-body);"
          >
            经历
          </h3>
          <div class="stagger-children relative space-y-0">
            <!-- Timeline line -->
            <div
              class="absolute left-[7px] top-2 bottom-2 w-px"
              style="background: var(--ink-border);"
            />

            <div
              v-for="item in timeline"
              :key="item.year"
              class="relative pl-10 pb-10 last:pb-0"
            >
              <!-- Dot -->
              <div
                class="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2"
                style="border-color: var(--ink-accent); background: var(--ink-bg-secondary);"
              />

              <span
                class="inline-block px-3 py-1 rounded-full text-xs font-medium mb-2"
                style="background: var(--ink-accent); color: var(--ink-bg);"
              >
                {{ item.year }}
              </span>
              <h4
                class="text-base font-semibold mb-1"
                style="color: var(--ink-text); font-family: var(--font-body);"
              >
                {{ item.title }}
              </h4>
              <p
                class="text-sm"
                style="color: var(--ink-text-muted); font-family: var(--font-body);"
              >
                {{ item.desc }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
