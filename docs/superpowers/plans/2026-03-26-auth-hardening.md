# Auth Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Harden registration and login flows against brute force, account enumeration, weak credentials, and unsafe auto-login behavior while preserving the current JWT-based architecture.

**Architecture:** Add a focused backend auth-security utility for normalization and validation, enforce dedicated auth rate limits at the route layer, and make the frontend registration flow stop issuing an immediate authenticated session. Keep the existing Express + JWT structure, but make auth behavior secure-by-default.

**Tech Stack:** Express, Mongoose, bcryptjs, express-rate-limit, Vue 3, Pinia, Node test runner

---

### Task 1: Add backend auth security primitives

**Files:**
- Create: `backend/utils/authSecurity.js`
- Test: `backend/tests/authSecurity.test.js`

- [ ] **Step 1: Write the failing test**
- [ ] **Step 2: Run `node --test backend/tests/authSecurity.test.js` and verify it fails**
- [ ] **Step 3: Implement username normalization, username validation, password policy, and timing-safe login helper**
- [ ] **Step 4: Run `node --test backend/tests/authSecurity.test.js` and verify it passes**

### Task 2: Harden backend register/login routes

**Files:**
- Modify: `backend/routes/auth.js`
- Modify: `backend/models/User.js`
- Modify: `backend/server.js`
- Test: `backend/tests/authRoutesSource.test.js`

- [ ] **Step 1: Write failing tests for auth route hardening expectations**
- [ ] **Step 2: Run `node --test backend/tests/authRoutesSource.test.js` and verify it fails**
- [ ] **Step 3: Add route-local rate limiters, username normalization, stronger validation, duplicate-account-safe responses, `isActive` enforcement, and remove register token issuance**
- [ ] **Step 4: Run `node --test backend/tests/authRoutesSource.test.js backend/tests/authSecurity.test.js` and verify it passes**

### Task 3: Update frontend auth UX

**Files:**
- Modify: `frontend/src/views/LoginPage.vue`
- Test: `frontend/tests/loginPageAuthFlow.test.js`

- [ ] **Step 1: Write failing tests for the new registration flow**
- [ ] **Step 2: Run `npm test -- loginPageAuthFlow.test.js` equivalent via `node --test tests/loginPageAuthFlow.test.js` in `frontend/` and verify it fails**
- [ ] **Step 3: Update registration to stop auto-login, switch back to login mode, and show a success message**
- [ ] **Step 4: Run `node --test tests/loginPageAuthFlow.test.js` in `frontend/` and verify it passes**

### Task 4: Full verification

**Files:**
- Verify only

- [ ] **Step 1: Run `node --test backend/tests/*.test.js`**
- [ ] **Step 2: Run `npm test` in `frontend/`**
- [ ] **Step 3: Run `npm run build` in `frontend/`**
- [ ] **Step 4: Review diff to ensure no auth secrets or unsafe logs were introduced**
