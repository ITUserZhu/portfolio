import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

function createLocalStorage(initial = {}) {
  const store = new Map(Object.entries(initial));

  return {
    getItem(key) {
      return store.has(key) ? store.get(key) : null;
    },
    setItem(key, value) {
      store.set(key, String(value));
    },
    removeItem(key) {
      store.delete(key);
    },
  };
}

test('auth store exposes logout and clears persisted auth state', async () => {
  global.localStorage = createLocalStorage({ auth_token: 'demo-token' });

  const { createPinia, setActivePinia } = await import('pinia');
  const { useAuthStore } = await import(`../src/stores/auth.js?case=${Date.now()}`);

  setActivePinia(createPinia());

  const auth = useAuthStore();
  auth.user = { role: 'user', username: 'demo' };

  assert.equal(typeof auth.logout, 'function');

  auth.logout();

  assert.equal(auth.token, '');
  assert.equal(auth.user, null);
  assert.equal(auth.initialized, true);
  assert.equal(global.localStorage.getItem('auth_token'), null);
});

test('App initializes auth on mount so navbar can reflect existing sessions', () => {
  const source = readFileSync(new URL('../src/App.vue', import.meta.url), 'utf8');

  assert.match(source, /useAuthStore/);
  assert.match(source, /auth\.init\(\)/);
});
