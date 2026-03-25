<script setup>
import { useUi } from '../ui/service';

const ui = useUi();

const toneClasses = {
  success: 'alert-success',
  error: 'alert-error',
  warning: 'alert-warning',
  info: 'alert-info',
};
</script>

<template>
  <div class="toast toast-top toast-end z-[80]">
    <div
      v-for="toast in ui.toasts"
      :key="toast.id"
      class="alert min-w-[18rem] max-w-sm border shadow-lg"
      :class="toneClasses[toast.type] || toneClasses.info"
      style="background: var(--ink-card-bg); border-color: var(--ink-border); color: var(--ink-text);"
    >
      <div class="flex-1">
        <div v-if="toast.title" class="font-semibold">{{ toast.title }}</div>
        <div class="text-sm whitespace-pre-line" :style="toast.title ? 'color: var(--ink-text-muted);' : ''">
          {{ toast.message }}
        </div>
      </div>
      <button type="button" class="btn btn-ghost btn-xs" @click="ui.dismissToast(toast.id)">
        关闭
      </button>
    </div>
  </div>
</template>
