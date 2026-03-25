import { ref } from 'vue';

function normalizeDialogOptions(options, variant) {
  const config = typeof options === 'string' ? { message: options } : { ...options };

  return {
    variant,
    title: config.title || (variant === 'confirm' ? '请确认操作' : '提示'),
    message: config.message || '',
    confirmLabel: config.confirmLabel || (variant === 'confirm' ? '确认' : '知道了'),
    cancelLabel: config.cancelLabel || '取消',
    tone: config.tone || 'primary',
  };
}

function normalizeToastOptions(options) {
  if (typeof options === 'string') {
    return {
      message: options,
    };
  }

  return { ...options };
}

export function createUiService() {
  const currentDialog = ref(null);
  const toasts = ref([]);
  const dialogQueue = [];
  const toastTimers = new Map();
  let dialogId = 0;
  let toastId = 0;

  function openNextDialog() {
    if (currentDialog.value || dialogQueue.length === 0) {
      return;
    }

    currentDialog.value = dialogQueue.shift();
  }

  function openDialog(options, variant) {
    const dialog = normalizeDialogOptions(options, variant);

    return new Promise((resolve) => {
      dialogQueue.push({
        id: `dialog-${dialogId += 1}`,
        ...dialog,
        resolve,
      });
      openNextDialog();
    });
  }

  function resolveDialog(confirmed) {
    if (!currentDialog.value) {
      return;
    }

    const activeDialog = currentDialog.value;
    currentDialog.value = null;
    activeDialog.resolve(confirmed);
    openNextDialog();
  }

  function alert(options) {
    return openDialog(options, 'alert');
  }

  function confirm(options) {
    return openDialog(options, 'confirm');
  }

  function dismissToast(id) {
    const timer = toastTimers.get(id);
    if (timer) {
      clearTimeout(timer);
      toastTimers.delete(id);
    }

    toasts.value = toasts.value.filter((toast) => toast.id !== id);
  }

  function notify(options) {
    const config = normalizeToastOptions(options);
    const toast = {
      id: `toast-${toastId += 1}`,
      type: config.type || 'info',
      title: config.title || '',
      message: config.message || '',
      duration: config.duration ?? 3000,
    };

    toasts.value = [...toasts.value, toast];

    if (toast.duration > 0) {
      const timer = setTimeout(() => {
        dismissToast(toast.id);
      }, toast.duration);
      toastTimers.set(toast.id, timer);
    }

    return toast.id;
  }

  const toast = {
    success(message, options = {}) {
      return notify({ ...options, type: 'success', message });
    },
    error(message, options = {}) {
      return notify({ ...options, type: 'error', message });
    },
    warning(message, options = {}) {
      return notify({ ...options, type: 'warning', message });
    },
    info(message, options = {}) {
      return notify({ ...options, type: 'info', message });
    },
  };

  return {
    currentDialog,
    toasts,
    alert,
    confirm,
    notify,
    dismissToast,
    resolveDialog,
    toast,
  };
}

const uiService = createUiService();

export function useUi() {
  return uiService;
}
