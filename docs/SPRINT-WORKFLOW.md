# Sprint Workflow — Coffee Calculator

**Defined:** 2026-10-02  
**Status:** ACTIVE

---

## Sequential Process (ALWAYS FOLLOW THIS ORDER)

### 1️⃣ **DEV** — Implement
- Amelia (Dev) codes the feature
- Unit tests included
- Component tested locally
- Status: Code ready for QA

### 2️⃣ **QA** — Validate
- Yui (QA) validates:
  - [ ] Mobile (375px) — touch, readability, spacing
  - [ ] Tablet (768px) — layout, scrolling, interaction
  - [ ] Desktop (1024px) — visual hierarchy, spacing
  - [ ] Cross-device — calculations, edge cases
  - [ ] Accessibility — aria-labels, keyboard nav, contrast
  - [ ] Design system — colors, spacing, typography
- Output: QA Test Suite + Report
- Status: Functional validation passed

### 3️⃣ **CODE REVIEW** — Quality Gate
- BMad code-review agente reviews:
  - [ ] TypeScript types correct
  - [ ] Logic sound
  - [ ] No regressions
  - [ ] Design system compliance
  - [ ] Test coverage
- Status: Code approved ✅ or findings returned

### 4️⃣ **GIT COMMIT** — Only After All Pass
- Stage files: `git add components/ __tests__/`
- Commit message: Clear, sprint-focused
- Attribution line included
- Status: Sprint locked in git history

### 5️⃣ **DONE** — Sprint 100% Complete
- Dev ✅
- QA ✅
- Code Review ✅
- Commit ✅
- Sprint ready for next phase

---

## Current Sprint Status

| Sprint | Dev | QA | Code Review | Commit | Status |
|--------|-----|----|----|--------|--------|
| Sprint 0 | ✅ | ⏳ | ⏳ | ✅ | BLOCKED |
| Sprint 1 | ✅ | ✅ | ✅ | ⏳ | BLOCKED |
| Sprint 2 | ✅ | ✅ | ⏳ | ⏳ | BLOCKED |

---

## ⚠️ **ISSUE**

Sprint 0 & 1 were committed together (not separated by sprint). Sprint 2 is ready for Code Review but hasn't been reviewed yet.

---

## Next Action

**For Sprint 2:**
1. ✅ Dev — DONE (Amelia)
2. ✅ QA — DONE (Yui)
3. ⏳ Code Review — PENDING (need to run bmad-code-review)
4. ⏳ Commit — PENDING (after code review passes)

Then proceed to Sprint 3.

---

## Blockers

Sprint cannot be marked DONE until Code Review passes + Commit is made.

**Do not skip steps.**

---

**Enforcer:** Follow this sequence every sprint. Document deviations.
