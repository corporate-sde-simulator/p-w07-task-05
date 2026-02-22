/**
 * Feature Flag Engine — evaluates feature flags for users.
 *
 * YOU MUST IMPLEMENT the methods marked with TODO.
 * TargetingRules is working — use it for rule evaluation.
 */

import { TargetingRules, Rule, FeatureFlag } from './targetingRules';

interface UserContext {
  userId: string;
  attributes: Record<string, string>;
  environment: string;
}

interface EvaluationResult {
  flagName: string;
  enabled: boolean;
  reason: string;
}

class FeatureFlagEngine {
  private flags: Map<string, FeatureFlag> = new Map();
  private targeting: TargetingRules;
  private evaluationLog: EvaluationResult[] = [];

  constructor() {
    this.targeting = new TargetingRules();
  }

  registerFlag(flag: FeatureFlag): void {
    this.flags.set(flag.name, flag);
  }

  /**
   * Evaluate whether a feature flag is enabled for a given user.
   *
   * 1. Look up the flag by name — return defaultValue if flag doesn't exist
   * 2. Check global enabled switch — if false, return false immediately
   * 3. Check environment — if user's environment not in allowedEnvironments, return false
   * 4. Check targeting rules using this.targeting.evaluateAllRules()
   *    - If rules don't match, return false
   * 5. Check percentage rollout using this.hashUser(userId, flagName)
   *    - If hash % 100 < percentageRollout, return true
   *    - Otherwise return false
   * 6. Log the result in evaluationLog
   */
  evaluate(flagName: string, user: UserContext): boolean {
    return false;
  }

  /**
   * Deterministic hash for percentage rollouts.
   * Same user + same flag = same hash value every time.
   *
   * 1. Concatenate userId + flagName
   * 2. Compute a simple hash (sum of char codes * prime)
   * 3. Return hash % 100 (gives 0-99)
   * Must be deterministic — no Math.random()!
   */
  hashUser(userId: string, flagName: string): number {
    return 0;
  }

  /**
   * Get all flags and their status for a given user.
   *
   * 1. Iterate over all registered flags
   * 2. Evaluate each one for the given user
   * 3. Return map of flagName -> boolean
   */
  getAllFlags(user: UserContext): Record<string, boolean> {
    return {};
  }

  getEvaluationLog(): EvaluationResult[] {
    return [...this.evaluationLog];
  }
}

export { FeatureFlagEngine, UserContext, EvaluationResult };
