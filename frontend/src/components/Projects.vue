<script setup>
import { usePortfolioStore } from '../stores/portfolio';
import { computed, ref } from 'vue';

const store = usePortfolioStore();
const projects = computed(() => store.projects);
const showAll = ref(false);

const displayProjects = computed(() =>
  showAll.value ? projects.value : projects.value.filter((p) => p.featured)
);
</script>

<template>
  <section
    id="projects"
    class="relative py-24 md:py-32 overflow-hidden"
    style="background: var(--ink-bg);"
  >
    <div class="max-w-6xl mx-auto px-6">
      <!-- Section Header -->
      <div class="reveal text-center mb-16">
        <span
          class="text-xs tracking-[0.3em] uppercase font-medium"
          style="color: var(--ink-accent); font-family: var(--font-body);"
        >
          Selected Work
        </span>
        <h2
          class="text-4xl md:text-5xl font-bold mt-3 mb-4"
          style="color: var(--ink-text); font-family: var(--font-display);"
        >
          精选<em>项目</em>
        </h2>
        <div class="section-divider mx-auto"></div>
      </div>

      <!-- Projects Grid — Asymmetric Magazine Layout -->
      <div class="grid md:grid-cols-12 gap-6">
        <div
          v-for="(project, idx) in displayProjects"
          :key="project.id"
          class="reveal group relative rounded-2xl overflow-hidden border transition-all duration-500
                 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
          :class="[
            idx === 0 ? 'md:col-span-7 md:row-span-2' : idx === 1 ? 'md:col-span-5' : idx === 2 ? 'md:col-span-5' : 'md:col-span-4',
            'reveal-delay-' + ((idx % 4) + 1)
          ]"
          style="border-color: var(--ink-border); background: var(--ink-card-bg);"
        >
          <!-- Project Image -->
          <div
            class="relative overflow-hidden"
            :class="idx === 0 ? 'h-64 md:h-full md:min-h-[400px]' : 'h-48'"
          >
            <img
              :src="project.image"
              :alt="project.title"
              class="w-full h-full object-cover transition-transform duration-700
                     group-hover:scale-110"
              loading="lazy"
            />
            <!-- Overlay -->
            <div
              class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500
                     flex items-center justify-center gap-4"
              style="background: rgba(13, 13, 18, 0.8);"
            >
              <a
                :href="project.github"
                target="_blank"
                rel="noopener"
                class="px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-300
                       hover:bg-white hover:text-black"
                style="color: white; border-color: white;"
              >
                GitHub
              </a>
              <a
                :href="project.demo"
                target="_blank"
                rel="noopener"
                class="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                       hover:shadow-lg"
                style="background: var(--ink-accent); color: var(--ink-bg);"
              >
                Live Demo
              </a>
            </div>
          </div>

          <!-- Project Info -->
          <div class="p-6">
            <h3
              class="text-xl font-bold mb-2 transition-colors duration-300
                     group-hover:text-[var(--ink-accent)]"
              style="color: var(--ink-text); font-family: var(--font-display);"
            >
              {{ project.title }}
            </h3>
            <p
              class="text-sm leading-relaxed mb-4 line-clamp-2"
              style="color: var(--ink-text-muted); font-family: var(--font-body);"
            >
              {{ project.description }}
            </p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="px-3 py-1 rounded-full text-xs font-medium border"
                style="color: var(--ink-accent); border-color: var(--ink-accent);
                       font-family: var(--font-body);"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Show More -->
      <div
        v-if="projects.length > 3"
        class="reveal text-center mt-12"
      >
        <button
          @click="showAll = !showAll"
          class="px-8 py-3 rounded-full font-medium text-sm tracking-wide border
                 transition-all duration-300 hover:-translate-y-0.5"
          style="color: var(--ink-accent); border-color: var(--ink-accent);
                 font-family: var(--font-body);"
        >
          {{ showAll ? '收起' : '查看全部项目' }}
          <span class="inline-block ml-1 transition-transform duration-300"
                :class="showAll ? 'rotate-180' : ''">↓</span>
        </button>
      </div>
    </div>
  </section>
</template>
