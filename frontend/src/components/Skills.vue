<script setup>
import { usePortfolioStore } from '../stores/portfolio';
import { computed } from 'vue';

const store = usePortfolioStore();
const skills = computed(() => store.skills);
</script>

<template>
  <section
    id="skills"
    class="relative py-24 md:py-32 overflow-hidden"
    style="background: var(--ink-bg-secondary);"
  >
    <!-- Decorative -->
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
          Expertise
        </span>
        <h2
          class="text-4xl md:text-5xl font-bold mt-3 mb-4"
          style="color: var(--ink-text); font-family: var(--font-display);"
        >
          技能<em> &amp; </em>专长
        </h2>
        <div class="section-divider mx-auto"></div>
      </div>

      <!-- Skills Grid -->
      <div class="grid md:grid-cols-2 gap-8">
        <div
          v-for="(category, idx) in skills"
          :key="category.id"
          class="reveal p-8 rounded-2xl border transition-all duration-500
                 hover:shadow-lg hover:-translate-y-1"
          :class="'reveal-delay-' + (idx + 1)"
          style="background: var(--ink-card-bg); border-color: var(--ink-border);
                 box-shadow: var(--ink-card-shadow);"
        >
          <!-- Category Header -->
          <div class="flex items-center gap-3 mb-6">
            <span
              class="text-xl"
              style="color: var(--ink-accent);"
            >
              {{ category.icon }}
            </span>
            <h3
              class="text-lg font-semibold"
              style="color: var(--ink-text); font-family: var(--font-body);"
            >
              {{ category.category }}
            </h3>
          </div>

          <!-- Skill Bars -->
          <div class="stagger-children space-y-5">
            <div v-for="skill in category.items" :key="skill.name">
              <div class="flex justify-between items-center mb-2">
                <span
                  class="text-sm font-medium"
                  style="color: var(--ink-text); font-family: var(--font-body);"
                >
                  {{ skill.name }}
                </span>
                <span
                  class="text-xs tabular-nums"
                  style="color: var(--ink-text-muted); font-family: var(--font-body);"
                >
                  {{ skill.level }}%
                </span>
              </div>
              <div
                class="h-1.5 rounded-full overflow-hidden"
                style="background: var(--ink-border);"
              >
                <div
                  class="skill-bar-fill h-full rounded-full"
                  :style="{
                    '--bar-width': skill.level + '%',
                    background: `linear-gradient(90deg, var(--ink-accent), ${skill.color})`,
                  }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
