import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../src/views/LoginPage.vue', import.meta.url), 'utf8');

test('LoginPage registration flow no longer auto logs in after register', () => {
  const registerBlock = source.match(/async function handleRegister\(\) \{[\s\S]*?\n\}/)?.[0] ?? '';

  assert.doesNotMatch(registerBlock, /await auth\.login\(username\.value, password\.value\)/);
  assert.match(registerBlock, /isRegisterMode\.value = false/);
});

test('LoginPage shows a success message after registration', () => {
  assert.match(source, /const success = ref\(''\)/);
  assert.match(source, /success\.value = '注册成功，请登录'/);
  assert.match(source, /<p v-if="success"/);
});
