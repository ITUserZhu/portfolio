<script setup>
import { ref, reactive } from 'vue';
import { submitContact } from '../api';

const form = reactive({
  name: '',
  email: '',
  message: '',
});

const status = ref('idle'); // idle | sending | sent | error
const statusMsg = ref('');

async function handleSubmit() {
  if (!form.name || !form.email || !form.message) return;
  status.value = 'sending';
  try {
    const res = await submitContact({ ...form });
    status.value = 'sent';
    statusMsg.value = res.message || '发送成功！';
    form.name = '';
    form.email = '';
    form.message = '';
    setTimeout(() => {
      status.value = 'idle';
    }, 4000);
  } catch (e) {
    status.value = 'error';
    statusMsg.value = '发送失败，请稍后重试';
    setTimeout(() => {
      status.value = 'idle';
    }, 3000);
  }
}
</script>

<template>
  <section
    id="contact"
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
          Get In Touch
        </span>
        <h2
          class="text-4xl md:text-5xl font-bold mt-3 mb-4"
          style="color: var(--ink-text); font-family: var(--font-display);"
        >
          联系<em>我</em>
        </h2>
        <div class="section-divider mx-auto mb-6"></div>
        <p
          class="max-w-lg mx-auto text-base"
          style="color: var(--ink-text-muted); font-family: var(--font-body);"
        >
          有项目想讨论，或只是想打个招呼？随时欢迎联系我。
        </p>
      </div>

      <!-- Contact Form -->
      <div class="max-w-xl mx-auto">
        <form @submit.prevent="handleSubmit" class="stagger-children space-y-6">
          <!-- Name -->
          <div class="relative">
            <input
              v-model="form.name"
              type="text"
              placeholder="你的名字"
              required
              class="w-full px-5 py-4 rounded-xl border text-sm outline-none
                     transition-all duration-300 focus:border-[var(--ink-accent)]
                     focus:shadow-[0_0_0_3px_var(--ink-accent)/10]"
              style="background: var(--ink-card-bg); border-color: var(--ink-border);
                     color: var(--ink-text); font-family: var(--font-body);"
            />
          </div>

          <!-- Email -->
          <div class="relative">
            <input
              v-model="form.email"
              type="email"
              placeholder="你的邮箱"
              required
              class="w-full px-5 py-4 rounded-xl border text-sm outline-none
                     transition-all duration-300 focus:border-[var(--ink-accent)]
                     focus:shadow-[0_0_0_3px_var(--ink-accent)/10]"
              style="background: var(--ink-card-bg); border-color: var(--ink-border);
                     color: var(--ink-text); font-family: var(--font-body);"
            />
          </div>

          <!-- Message -->
          <div class="relative">
            <textarea
              v-model="form.message"
              rows="5"
              placeholder="你的留言..."
              required
              class="w-full px-5 py-4 rounded-xl border text-sm outline-none resize-none
                     transition-all duration-300 focus:border-[var(--ink-accent)]
                     focus:shadow-[0_0_0_3px_var(--ink-accent)/10]"
              style="background: var(--ink-card-bg); border-color: var(--ink-border);
                     color: var(--ink-text); font-family: var(--font-body);"
            />
          </div>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="status === 'sending'"
            class="w-full py-4 rounded-xl font-medium text-sm tracking-wide
                   transition-all duration-300 hover:shadow-lg hover:shadow-[var(--ink-accent)]/20
                   hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
            style="background: var(--ink-accent); color: var(--ink-bg); font-family: var(--font-body);"
          >
            <span v-if="status === 'idle'">发送消息 →</span>
            <span v-else-if="status === 'sending'" class="inline-flex items-center gap-2">
              <svg class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" class="opacity-25"/>
                <path d="M4 12a8 8 0 018-8" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
              </svg>
              发送中...
            </span>
            <span v-else-if="status === 'sent'">✓ {{ statusMsg }}</span>
            <span v-else>{{ statusMsg }}</span>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
