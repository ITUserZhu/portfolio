export async function resolveProtectedNavigation({
  requiresAuth,
  hasToken,
  isValidated,
  validateSession,
}) {
  if (!requiresAuth) {
    return null;
  }

  if (!hasToken) {
    return { name: 'Login' };
  }

  if (isValidated) {
    return null;
  }

  const isValid = await validateSession();
  return isValid ? null : { name: 'Login' };
}
