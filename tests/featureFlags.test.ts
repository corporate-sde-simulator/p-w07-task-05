import { FeatureFlags } from "../src/featureFlags";
import { TargetingRules } from "../src/targetingRules";

describe("Feature flag evaluation engine", () => {
    test("should process valid input", () => {
        const obj = new FeatureFlags();
        expect(obj.process({ key: "val" })).not.toBeNull();
    });
    test("should handle null", () => {
        const obj = new FeatureFlags();
        expect(obj.process(null)).toBeNull();
    });
    test("should track stats", () => {
        const obj = new FeatureFlags();
        obj.process({ x: 1 });
        expect(obj.getStats().processed).toBe(1);
    });
    test("support should work", () => {
        const obj = new TargetingRules();
        expect(obj.process({ data: "test" })).not.toBeNull();
    });
});
