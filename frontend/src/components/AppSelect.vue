<script setup>
import { computed } from 'vue';

const model = defineModel();

const props = defineProps({
  size: {
    type: String,
    default: 'md',
  },
  variant: {
    type: String,
    default: 'default',
  },
  surface: {
    type: String,
    default: 'card',
  },
});

const sizeClass = computed(() => {
  if (props.size === 'sm') return 'select-sm';
  if (props.size === 'lg') return 'select-lg';
  return '';
});

const variantClass = computed(() => {
  if (props.variant === 'toolbar') {
    return 'h-14 min-h-14 px-5 font-medium shadow-sm hover:shadow-lg';
  }

  return 'min-h-12';
});

const surfaceStyle = computed(() => {
  const background = props.surface === 'base' ? 'var(--ink-bg)' : 'var(--ink-card-bg)';
  return `background: ${background}; border-color: var(--ink-border); color: var(--ink-text);`;
});
</script>

<template>
  <select
    v-model="model"
    class="select select-bordered rounded-xl text-sm cursor-pointer transition-all duration-300 focus:outline-none focus:border-[var(--ink-accent)] w-auto"
    :class="[sizeClass, variantClass]"
    :style="surfaceStyle"
  >
    <slot />
  </select>
</template>
