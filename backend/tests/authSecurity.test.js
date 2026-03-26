const test = require('node:test');
const assert = require('node:assert/strict');

const {
  normalizeUsername,
  validateUsername,
  validatePassword,
} = require('../utils/authSecurity');

test('normalizeUsername trims and lowercases usernames', () => {
  assert.equal(normalizeUsername('  Alice_01  '), 'alice_01');
});

test('validateUsername accepts only safe normalized usernames', () => {
  assert.deepEqual(validateUsername('valid_name-01'), { valid: true });
  assert.deepEqual(validateUsername('ab').valid, false);
  assert.deepEqual(validateUsername('bad name').valid, false);
  assert.deepEqual(validateUsername('admin!').valid, false);
});

test('validatePassword requires at least 8 chars with letters and numbers', () => {
  assert.deepEqual(validatePassword('abc12345'), { valid: true });
  assert.equal(validatePassword('short1').valid, false);
  assert.equal(validatePassword('allletters').valid, false);
  assert.equal(validatePassword('12345678').valid, false);
});
