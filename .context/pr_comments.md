# PR Review - Feature flag evaluation engine (by Kiran)

## Reviewer: Kavitha Rajan
---

**Overall:** Good foundation but critical bugs need fixing before merge.

### `featureFlags.ts`

> **Bug #1:** Percentage rollout hash is not deterministic so same user gets different flag values on each call
> This is the higher priority fix. Check the logic carefully and compare against the design doc.

### `targetingRules.ts`

> **Bug #2:** Rule evaluation short-circuits on first match instead of evaluating all rules with priority
> This is more subtle but will cause issues in production. Make sure to add a test case for this.

---

**Kiran**
> Acknowledged. I have documented the issues for whoever picks this up.
