# Beginner Explanatory Guide: PLATFORM-2961: Build feature flag evaluation engine

> **Task Type**: Product Task  
> **Domain/Focus**: Feature Flags, TypeScript, Backend Development

---

## 1. The Goal (In-Depth Beginner Explanation)

### The Core Problem
In modern software development, feature flags (also known as feature toggles) are essential for controlling the visibility of new features in an application. They allow developers to enable or disable features for specific users or groups without deploying new code. The task at hand is to build a `FeatureFlagEngine` that evaluates whether a user should see a feature based on various conditions, such as percentage rollouts, user attributes, and the environment in which the application is running.

Currently, the `FeatureFlagEngine` is incomplete, as it contains several TODOs that need to be implemented. Without this engine, the application cannot effectively manage feature visibility, which can lead to inconsistent user experiences. For example, if a new feature is rolled out to only 50% of users, the engine must ensure that the same users see the feature consistently across sessions. This is crucial for testing new features and gathering user feedback without affecting the entire user base.

Fixing this issue is important because it enhances the application's flexibility and allows for safer deployments. By implementing the feature flag evaluation engine, we can ensure that features are rolled out gradually and controlled, reducing the risk of introducing bugs to all users at once.

### Jargon Buster (Key Terms Explained)
* **Feature Flag**: A feature flag is a technique in software development that allows developers to enable or disable features in an application without deploying new code. For example, a new payment option can be hidden from users until it is fully tested and ready for release.

* **Deterministic Hashing**: This is a method of generating a consistent output (hash) from a given input (like a user ID and flag name). It ensures that the same input will always produce the same output. For instance, if a user with ID "123" checks a feature flag named "new-payment", the hash generated will always be the same, allowing consistent feature visibility.

* **Targeting Rules**: These are conditions that determine whether a feature should be enabled for a specific user based on their attributes (like country or subscription plan). For example, a feature might only be available to users in the "premium" plan or users located in "IN".

* **Environment**: This refers to the context in which the application is running, such as development (dev), staging, or production (prod). Different environments may have different configurations for feature flags. For instance, a feature might be enabled in the staging environment for testing but disabled in production until it is fully ready.

### Expected Outcome
After implementing the `FeatureFlagEngine`, the system should behave as follows:

**Before**: Users may see features inconsistently, and there is no control over who gets access to new features. The application lacks a mechanism to evaluate feature flags based on user attributes or environments.

**After**: The `FeatureFlagEngine` will evaluate feature flags based on user context, ensuring that users see features consistently according to the defined rules. The engine will check if the feature is enabled globally, if the user meets the targeting rules, and if the feature is available in the user's environment. If all conditions are met, the feature will be enabled; otherwise, it will be disabled.

---

## 2. Related Coding Concepts & Syntax (50% Theory, 50% Practice)

### Concept 1: Conditional Logic
#### 📘 Theoretical Overview (50%)
Conditional logic is a fundamental programming concept that allows developers to execute different code paths based on certain conditions. It is essential for making decisions in code, such as whether to enable a feature based on user attributes or environment settings. Without conditional logic, all code would run sequentially without any checks, leading to a lack of flexibility and control.

Key mechanisms include:
- **If Statements**: These allow you to specify a condition and execute a block of code if that condition is true.
- **Switch Statements**: These provide a way to execute different code blocks based on the value of a variable.
- **Logical Operators**: Operators like `&&` (AND) and `||` (OR) allow for combining multiple conditions.

#### 💻 Syntax & Practical Examples (50%)
* **Language Syntax**:
  ```typescript
  if (condition) {
      // Code to execute if condition is true
  } else {
      // Code to execute if condition is false
  }
  ```

* **Real-World Application**:
  ```typescript
  const user = { country: 'IN', plan: 'premium' };
  const featureEnabled = user.country === 'IN' && user.plan === 'premium';

  if (featureEnabled) {
      console.log("Feature is enabled for this user.");
  } else {
      console.log("Feature is not enabled for this user.");
  }
  ```

### Concept 2: Hashing
#### 📘 Theoretical Overview (50%)
Hashing is a process that transforms input data into a fixed-size string of characters, which is typically a hash code. This is crucial for tasks like securely storing passwords or, in our case, determining feature visibility based on user IDs. A good hash function should produce the same output for the same input consistently, which is known as deterministic hashing.

Key mechanisms include:
- **Concatenation**: Combining multiple strings (like user ID and flag name) to create a unique input for the hash function.
- **Character Codes**: Using the ASCII or Unicode values of characters to compute the hash.

#### 💻 Syntax & Practical Examples (50%)
* **Language Syntax**:
  ```typescript
  function hashUser(userId: string, flagName: string): number {
      const combined = userId + flagName;
      let hash = 0;
      for (let i = 0; i < combined.length; i++) {
          hash += combined.charCodeAt(i);
      }
      return hash % 100; // Returns a number between 0 and 99
  }
  ```

* **Real-World Application**:
  ```typescript
  const userId = "user123";
  const flagName = "new-feature";
  const hashValue = hashUser(userId, flagName);
  console.log(`Hash value for user ${userId} and flag ${flagName} is: ${hashValue}`);
  ```

---

## 3. Step-by-Step Logic & Walkthrough

1. **Step 1: Locate and Analyze the Target File**
   * Navigate to the `featureFlags.ts` file in the `p-w07-task-05` folder.
   * Focus on the `evaluate()` method, which currently contains a TODO comment. This is where the main logic for evaluating feature flags will be implemented.

2. **Step 2: Input Verification & Validation**
   * Check if the `flagName` exists in the `flags` map. If it doesn't, return the default value of the flag.
   * Verify if the global `enabled` switch for the flag is set to false. If so, return false immediately.
   * Ensure the user's environment is included in the `allowedEnvironments` of the flag.

3. **Step 3: Core Implementation / Modification**
   * Use the `this.targeting.evaluateAllRules()` method to check if the user's attributes meet the targeting rules defined for the flag.
   * If the rules do not match, return false.
   * Calculate the percentage rollout using the `this.hashUser()` method. If the hash value is less than the `percentageRollout`, return true; otherwise, return false.

4. **Step 4: Output Verification & Testing**
   * After implementing the logic, run the unit tests defined in `featureFlags.test.ts` to ensure that all tests pass and the feature flag evaluation works as expected.

---

## 4. Detailed Walkthrough of Test Cases

### Test Case 1: Standard / Success Case
* **Description**: This test checks if the feature flag is correctly enabled for a user who meets all conditions.
* **Inputs**:
  ```json
  {
      "flagName": "new-feature",
      "user": {
          "userId": "user123",
          "attributes": {
              "country": "IN",
              "plan": "premium"
          },
          "environment": "prod"
      }
  }
  ```
* **Step-by-Step Execution Trace**:
  1. The `evaluate()` function receives the flag name and user context.
  2. It checks if "new-feature" exists in the flags map and finds it.
  3. The global `enabled` switch is true, so it proceeds.
  4. The user's environment "prod" is in the allowed environments for the flag.
  5. The targeting rules are evaluated and found to match the user's attributes.
  6. The hash for the user and flag is calculated, and if it falls within the percentage rollout, the function returns true.
* **Expected Output**: `true`

### Test Case 2: Edge Case / Validation Fail
* **Description**: This test checks the scenario where the user does not meet the targeting rules.
* **Inputs**:
  ```json
  {
      "flagName": "new-feature",
      "user": {
          "userId": "user456",
          "attributes": {
              "country": "US",
              "plan": "basic"
          },
          "environment": "prod"
      }
  }
  ```
* **Step-by-Step Execution Trace**:
  1. The `evaluate()` function receives the flag name and user context.
  2. It checks if "new-feature" exists in the flags map and finds it.
  3. The global `enabled` switch is true, so it proceeds.
  4. The user's environment "prod" is in the allowed environments for the flag.
  5. The targeting rules are evaluated and found to not match the user's attributes (country and plan do not meet the criteria).
  6. The function returns false without checking the percentage rollout.
* **Expected Output**: `false`