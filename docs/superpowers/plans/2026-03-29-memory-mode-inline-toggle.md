# MemoryMode Inline Toggle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the bottom-bar favorite/mastered buttons toggle the current word in place while keeping swipe gestures advancing to the next card.

**Architecture:** Keep swipe handlers mapped to the existing advance-and-animate actions, and add separate in-place toggle handlers for bottom-bar clicks. Cover the regression with a source-level test that locks the template bindings and handler split.

**Tech Stack:** Vue 3 SFC, node:test, assert/strict

---

### Task 1: Lock the interaction split with a failing test

**Files:**
- Create: `frontend/tests/memoryModeControls.test.js`
- Test: `frontend/tests/memoryModeControls.test.js`

- [ ] **Step 1: Write the failing test**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../src/views/MemoryMode.vue', import.meta.url), 'utf8');

test('MemoryMode binds bottom-bar favorite/mastered buttons to in-place toggles', () => {
  assert.match(source, /@click="toggleFavoriteInPlace"/);
  assert.match(source, /@click="toggleMasteredInPlace"/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/memoryModeControls.test.js`
Expected: FAIL because the current template still binds the bottom buttons to `handleFavorite` and `handleMastered`.

- [ ] **Step 3: Extend the test to protect gesture behavior**

```js
test('MemoryMode keeps swipe gestures bound to advance handlers', () => {
  assert.match(source, /onSwipeLeft:\s*\(\)\s*=>\s*\{[\s\S]*handleMastered\(\)/);
  assert.match(source, /onSwipeRight:\s*\(\)\s*=>\s*\{[\s\S]*handleFavorite\(\)/);
});
```

- [ ] **Step 4: Run test to verify the targeted failure remains the button binding**

Run: `npm test -- tests/memoryModeControls.test.js`
Expected: FAIL only on the missing in-place button handlers.

### Task 2: Implement in-place toggle handlers

**Files:**
- Modify: `frontend/src/views/MemoryMode.vue`
- Test: `frontend/tests/memoryModeControls.test.js`

- [ ] **Step 1: Write minimal in-place toggle handlers**

```js
async function toggleFavoriteInPlace() {
  if (isAnimating.value || !currentWord.value) return;
  await toggleFavorite(currentWord.value._id);
  currentWord.value.isFavorite = !currentWord.value.isFavorite;
}
```

- [ ] **Step 2: Bind the bottom-bar buttons to the new handlers**

```vue
<button @click="toggleFavoriteInPlace">
<button @click="toggleMasteredInPlace">
```

- [ ] **Step 3: Keep swipe handlers on advance methods**

```js
onSwipeLeft: () => {
  if (!isFlipped.value) {
    justSwiped.value = true;
    handleMastered();
  }
},
onSwipeRight: () => {
  if (!isFlipped.value) {
    justSwiped.value = true;
    handleFavorite();
  }
},
```

- [ ] **Step 4: Update stats bookkeeping for both increment and decrement**

```js
currentWord.value.isFavorite = !currentWord.value.isFavorite;
sessionStats.value.favorited += currentWord.value.isFavorite ? 1 : -1;
```

- [ ] **Step 5: Run the targeted test to verify it passes**

Run: `npm test -- tests/memoryModeControls.test.js`
Expected: PASS

### Task 3: Verify no regression in the frontend test suite

**Files:**
- Test: `frontend/tests/*.test.js`

- [ ] **Step 1: Run the full frontend test suite**

Run: `npm test`
Expected: PASS with all frontend tests green.
