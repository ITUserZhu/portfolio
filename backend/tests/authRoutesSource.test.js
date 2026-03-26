const test = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const path = require('node:path');

const authSource = readFileSync(path.join(__dirname, '../routes/auth.js'), 'utf8');
const userSource = readFileSync(path.join(__dirname, '../models/User.js'), 'utf8');
const serverSource = readFileSync(path.join(__dirname, '../server.js'), 'utf8');

test('auth routes apply dedicated auth rate limiting and stop issuing a register token', () => {
  assert.match(authSource, /const registerLimiter = rateLimit/);
  assert.match(authSource, /const loginLimiter = rateLimit/);
  assert.match(authSource, /router\.post\('\/register', registerLimiter/);
  assert.match(authSource, /router\.post\('\/login', loginLimiter/);
  assert.equal((authSource.match(/jwt\.sign/g) ?? []).length, 1);
});

test('auth routes normalize usernames and enforce inactive-user rejection', () => {
  assert.match(authSource, /normalizeUsername/);
  assert.match(authSource, /validateUsername/);
  assert.match(authSource, /validatePassword/);
  assert.match(authSource, /!user\.isActive/);
});

test('user model stores normalized usernames', () => {
  assert.match(userSource, /lowercase: true/);
});

test('server disables express fingerprinting', () => {
  assert.match(serverSource, /app\.disable\('x-powered-by'\)/);
});
