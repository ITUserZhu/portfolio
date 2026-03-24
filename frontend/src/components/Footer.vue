<script setup>
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<template>
  <footer
    class="relative py-12 border-t"
    style="background: var(--ink-bg-secondary); border-color: var(--ink-border);"
  >
    <div class="max-w-6xl mx-auto px-6">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <!-- Logo -->
        <a
          href="#hero"
          @click.prevent="scrollToTop"
          class="text-2xl font-bold tracking-tight"
          style="color: var(--ink-accent); font-family: var(--font-display);"
        >
          Juleon<span style="color: var(--ink-text);">.</span>Z
        </a>

        <!-- Copyright -->
        <p
          class="text-sm"
          style="color: var(--ink-text-muted); font-family: var(--font-body);"
        >
          &copy; {{ new Date().getFullYear() }} Juleon. Crafted with passion.
        </p>

        <!-- Back to Top -->
        <button
          @click="scrollToTop"
          class="w-10 h-10 rounded-full border flex items-center justify-center
                 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--ink-accent)]"
          style="border-color: var(--ink-border); color: var(--ink-text-muted);"
          aria-label="回到顶部"
        >
          ↑
        </button>
      </div>
    </div>
  </footer>
</template>
