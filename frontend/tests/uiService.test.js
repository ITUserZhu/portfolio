import test from 'node:test';
import assert from 'node:assert/strict';

import { createUiService } from '../src/ui/service.js';

test('createUiService queues dialogs and resolves them in order', async () => {
  const ui = createUiService();

  const firstDialog = ui.confirm({ title: 'First', message: 'one' });
  const secondDialog = ui.alert({ title: 'Second', message: 'two' });

  assert.equal(ui.currentDialog.value?.title, 'First');

  ui.resolveDialog(true);
  assert.equal(await firstDialog, true);
  assert.equal(ui.currentDialog.value?.title, 'Second');

  ui.resolveDialog(true);
  assert.equal(await secondDialog, true);
  assert.equal(ui.currentDialog.value, null);
});

test('createUiService stores and removes toasts', () => {
  const ui = createUiService();

  const toastId = ui.notify({
    type: 'success',
    title: 'Saved',
    message: 'Vocabulary saved',
    duration: 0,
  });

  assert.equal(ui.toasts.value.length, 1);
  assert.equal(ui.toasts.value[0].id, toastId);
  assert.equal(ui.toasts.value[0].type, 'success');

  ui.dismissToast(toastId);
  assert.equal(ui.toasts.value.length, 0);
});
