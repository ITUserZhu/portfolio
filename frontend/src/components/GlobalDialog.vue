<script setup>
import { computed } from 'vue';
import { useUi } from '../ui/service';

const ui = useUi();

const dialog = computed(() => ui.currentDialog.value);

const toneClasses = {
  primary: 'btn-primary',
  danger: 'btn-error',
  warning: 'btn-warning',
  success: 'btn-success',
};

function confirmAction() {
  ui.resolveDialog(true);
}

function cancelAction() {
  ui.resolveDialog(false);
}
</script>

<template>
  <div v-if="dialog" class="modal modal-open" role="dialog" aria-modal="true">
    <div class="modal-box max-w-md border shadow-2xl" style="background: var(--ink-card-bg); border-color: var(--ink-border); color: var(--ink-text);">
      <h3 class="text-xl font-bold" style="font-family: var(--font-display);">
        {{ dialog.title }}
      </h3>
      <p class="py-4 whitespace-pre-line" style="color: var(--ink-text-muted);">
        {{ dialog.message }}
      </p>
      <div class="modal-action">
        <button
          v-if="dialog.variant === 'confirm'"
          type="button"
          class="btn btn-ghost"
          @click="cancelAction"
        >
          {{ dialog.cancelLabel }}
        </button>
        <button
          type="button"
          class="btn"
          :class="toneClasses[dialog.tone] || toneClasses.primary"
          @click="confirmAction"
        >
          {{ dialog.confirmLabel }}
        </button>
      </div>
    </div>
    <div class="modal-backdrop bg-black/55"></div>
  </div>
</template>
