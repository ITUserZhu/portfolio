import test from 'node:test';
import assert from 'node:assert/strict';

import { resolveProtectedNavigation } from '../src/utils/authSession.js';

test('resolveProtectedNavigation allows public routes', async () => {
  const redirect = await resolveProtectedNavigation({
    requiresAuth: false,
    hasToken: false,
    isValidated: false,
    validateSession: async () => false
  });

  assert.equal(redirect, null);
});

test('resolveProtectedNavigation redirects to login when token is missing', async () => {
  const redirect = await resolveProtectedNavigation({
    requiresAuth: true,
    hasToken: false,
    isValidated: false,
    validateSession: async () => true
  });

  assert.deepEqual(redirect, { name: 'Login' });
});

test('resolveProtectedNavigation validates the session before allowing access', async () => {
  let called = 0;

  const redirect = await resolveProtectedNavigation({
    requiresAuth: true,
    hasToken: true,
    isValidated: false,
    validateSession: async () => {
      called += 1;
      return false;
    }
  });

  assert.equal(called, 1);
  assert.deepEqual(redirect, { name: 'Login' });
});

test('resolveProtectedNavigation skips repeated validation after a session is confirmed', async () => {
  let called = 0;

  const redirect = await resolveProtectedNavigation({
    requiresAuth: true,
    hasToken: true,
    isValidated: true,
    validateSession: async () => {
      called += 1;
      return true;
    }
  });

  assert.equal(called, 0);
  assert.equal(redirect, null);
});
