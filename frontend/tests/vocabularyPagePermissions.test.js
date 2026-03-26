import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../src/views/VocabularyPage.vue', import.meta.url), 'utf8');

test('VocabularyPage drives favorite and mastered filter buttons from active styles', () => {
  assert.match(source, /function getFilterButtonStyle\(isActive\)/);
  assert.match(source, /:style="getFilterButtonStyle\(showFavoritesOnly\)"/);
  assert.match(source, /:style="getFilterButtonStyle\(showMasteredOnly\)"/);
});

test('VocabularyPage only shows vocabulary management controls to admins', () => {
  const adminVisibilityMatches = source.match(/v-if="auth\.isAdmin"/g) ?? [];

  assert.ok(adminVisibilityMatches.length >= 3);
});
