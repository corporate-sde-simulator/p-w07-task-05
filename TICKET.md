# PLATFORM-2961: Build feature flag evaluation engine

**Status:** In Progress · **Priority:** High
**Sprint:** Sprint 29 · **Story Points:** 5
**Reporter:** Nisha Gupta (Platform Lead) · **Assignee:** You (Intern)
**Due:** End of sprint (Friday)
**Labels:** `backend`, `typescript`, `feature-flags`, `rollout`
**Task Type:** Feature Ship

---

## Description

The `TargetingRules` module defines flag conditions. Build the `FeatureFlagEngine` that evaluates whether a user should see a feature based on percentage rollouts, user targeting, and environment rules. Implement the TODOs in `featureFlags.ts`.

## Acceptance Criteria

- [ ] `evaluate()` returns boolean for a given user and flag
- [ ] Percentage rollout uses deterministic hashing (same user = same result every time)
- [ ] User attribute targeting works (e.g., country=IN, plan=premium)
- [ ] Environment-based flags (dev/staging/prod enablement)
- [ ] Default value returned for unknown flags
- [ ] All unit tests pass
