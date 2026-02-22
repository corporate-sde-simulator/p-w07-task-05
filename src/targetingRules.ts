/**
 * Targeting Rules — defines conditions for feature flag evaluation.
 *
 * This module is COMPLETE and WORKING. Your task is in featureFlags.ts.
 *
 * Author: Nisha Gupta (Platform team)
 * Last Modified: 2026-03-19
 */

interface Rule {
  attribute: string;     // e.g., "country", "plan", "userId"
  operator: 'equals' | 'not_equals' | 'contains' | 'in_list' | 'regex';
  value: string | string[];
}

interface FeatureFlag {
  name: string;
  description: string;
  enabled: boolean;              // Global kill switch
  percentageRollout: number;     // 0-100, percentage of users who get the feature
  targetingRules: Rule[];        // All rules must match (AND logic)
  allowedEnvironments: string[]; // e.g., ['dev', 'staging', 'prod']
  defaultValue: boolean;
}

class TargetingRules {
  evaluateRule(rule: Rule, userAttributes: Record<string, string>): boolean {
    const userValue = userAttributes[rule.attribute];
    if (userValue === undefined) return false;

    switch (rule.operator) {
      case 'equals':
        return userValue === rule.value;
      case 'not_equals':
        return userValue !== rule.value;
      case 'contains':
        return typeof rule.value === 'string' && userValue.includes(rule.value);
      case 'in_list':
        return Array.isArray(rule.value) && rule.value.includes(userValue);
      case 'regex':
        return typeof rule.value === 'string' && new RegExp(rule.value).test(userValue);
      default:
        return false;
    }
  }

  evaluateAllRules(rules: Rule[], userAttributes: Record<string, string>): boolean {
    if (rules.length === 0) return true;
    return rules.every(rule => this.evaluateRule(rule, userAttributes));
  }
}

export { TargetingRules, Rule, FeatureFlag };
