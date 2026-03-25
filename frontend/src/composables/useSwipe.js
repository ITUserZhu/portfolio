import { ref } from 'vue';

export function useSwipe(el, options = {}) {
  const { threshold = 50, onSwipeUp, onSwipeLeft, onSwipeRight, onTap } = options;

  const direction = ref(null);
  const deltaX = ref(0);
  const deltaY = ref(0);
  const isSwiping = ref(false);

  let startX = 0;
  let startY = 0;
  let startTime = 0;

  function onTouchStart(e) {
    const touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    startTime = Date.now();
    deltaX.value = 0;
    deltaY.value = 0;
    direction.value = null;
    isSwiping.value = true;
  }

  function onTouchMove(e) {
    if (!isSwiping.value) return;
    const touch = e.touches[0];
    deltaX.value = touch.clientX - startX;
    deltaY.value = touch.clientY - startY;
  }

  function onTouchEnd() {
    if (!isSwiping.value) return;
    isSwiping.value = false;

    const absX = Math.abs(deltaX.value);
    const absY = Math.abs(deltaY.value);
    const elapsed = Date.now() - startTime;

    // 点击判定：移动距离小且时间短
    if (absX < 10 && absY < 10 && elapsed < 300) {
      onTap?.();
      return;
    }

    if (absX < threshold && absY < threshold) return;

    if (absY > absX && deltaY.value < -threshold) {
      direction.value = 'up';
      onSwipeUp?.();
    } else if (absX > absY && deltaX.value < -threshold) {
      direction.value = 'left';
      onSwipeLeft?.();
    } else if (absX > absY && deltaX.value > threshold) {
      direction.value = 'right';
      onSwipeRight?.();
    }
  }

  // 鼠标事件支持（桌面端）
  function onMouseDown(e) {
    startX = e.clientX;
    startY = e.clientY;
    startTime = Date.now();
    deltaX.value = 0;
    deltaY.value = 0;
    direction.value = null;
    isSwiping.value = true;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function onMouseMove(e) {
    if (!isSwiping.value) return;
    deltaX.value = e.clientX - startX;
    deltaY.value = e.clientY - startY;
  }

  function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    onTouchEnd();
  }

  function bindEvents(element) {
    element.addEventListener('touchstart', onTouchStart, { passive: true });
    element.addEventListener('touchmove', onTouchMove, { passive: true });
    element.addEventListener('touchend', onTouchEnd);
    element.addEventListener('mousedown', onMouseDown);
  }

  function unbindEvents(element) {
    element.removeEventListener('touchstart', onTouchStart);
    element.removeEventListener('touchmove', onTouchMove);
    element.removeEventListener('touchend', onTouchEnd);
    element.removeEventListener('mousedown', onMouseDown);
  }

  return {
    direction,
    deltaX,
    deltaY,
    isSwiping,
    bindEvents,
    unbindEvents
  };
}
