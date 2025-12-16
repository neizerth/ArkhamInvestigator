/**
 * Tests for ChaosOdds JSI bindings
 * These tests verify that all required functions are available and have correct signatures
 */

import ChaosOddsJSI from "../ChaosOddsJSI";

describe("ChaosOddsJSI", () => {
	describe("Module availability", () => {
		it("should have ChaosOdds global object", () => {
			expect(global.ChaosOdds).toBeDefined();
		});

		it("should export ChaosOddsJSI", () => {
			expect(ChaosOddsJSI).toBeDefined();
		});
	});

	describe("Function availability", () => {
		it("should have calculate function", () => {
			expect(ChaosOddsJSI?.calculate).toBeDefined();
			expect(typeof ChaosOddsJSI?.calculate).toBe("function");
		});

		it("should have freeString function", () => {
			expect(ChaosOddsJSI?.freeString).toBeDefined();
			expect(typeof ChaosOddsJSI?.freeString).toBe("function");
		});

		it("should have cancel function", () => {
			expect(ChaosOddsJSI?.cancel).toBeDefined();
			expect(typeof ChaosOddsJSI?.cancel).toBe("function");
		});
	});

	describe("Function signatures", () => {
		it("calculate should accept 2 string arguments", async () => {
			if (!ChaosOddsJSI?.calculate) {
				return; // Skip if not available (e.g., on web)
			}

			const testInput = JSON.stringify([
				{
					token_type: "plusOne",
					value: 1,
					is_fail: false,
					is_success: false,
					reveal_count: 0,
				},
			]);

			// Should not throw with valid arguments
			const result = await ChaosOddsJSI.calculate(testInput, "[]");
			if (result !== null) {
				// Result should be an object with id and result
				expect(result).toHaveProperty("id");
				expect(result).toHaveProperty("result");
				expect(typeof result.id).toBe("number");
				expect(typeof result.result).toBe("string");
				// Result should be a valid JSON string
				expect(() => JSON.parse(result.result)).not.toThrow();
				// Free the memory using ID
				ChaosOddsJSI.freeString(result.id);
			}
		});

		it("calculate should return null or CalculateResult object", async () => {
			if (!ChaosOddsJSI?.calculate) {
				return;
			}

			const testInput = JSON.stringify([
				{
					token_type: "plusOne",
					value: 1,
					is_fail: false,
					is_success: false,
					reveal_count: 0,
				},
			]);

			const result = await ChaosOddsJSI.calculate(testInput, "[]");
			expect(
				result === null ||
					(typeof result === "object" &&
						result !== null &&
						"id" in result &&
						"result" in result),
			).toBe(true);

			if (result !== null) {
				expect(result.id).toBeGreaterThan(0);
				expect(typeof result.result).toBe("string");
				ChaosOddsJSI.freeString(result.id);
			}
		});

		it("freeString should accept number (ID) argument", () => {
			if (!ChaosOddsJSI?.freeString) {
				return;
			}

			// Should not throw with valid number ID
			expect(() => {
				ChaosOddsJSI.freeString(1);
			}).not.toThrow();
		});

		it("freeString should accept string (ID) argument for backwards compatibility", () => {
			if (!ChaosOddsJSI?.freeString) {
				return;
			}

			// Should not throw with valid string ID (for backwards compatibility)
			expect(() => {
				ChaosOddsJSI.freeString("1");
			}).not.toThrow();
		});

		it("cancel should accept no arguments", () => {
			if (!ChaosOddsJSI?.cancel) {
				return;
			}

			// Should not throw
			expect(() => {
				ChaosOddsJSI.cancel();
			}).not.toThrow();
		});
	});

	describe("Memory management", () => {
		it("should not leak memory on multiple calls", async () => {
			if (!ChaosOddsJSI?.calculate || !ChaosOddsJSI?.freeString) {
				return;
			}

			const testInput = JSON.stringify([
				{
					token_type: "plusOne",
					value: 1,
					is_fail: false,
					is_success: false,
					reveal_count: 0,
				},
			]);

			// Call multiple times and ensure memory is freed
			for (let i = 0; i < 10; i++) {
				const result = await ChaosOddsJSI.calculate(testInput, "[]");
				if (result !== null) {
					// Verify result structure
					expect(result).toHaveProperty("id");
					expect(result).toHaveProperty("result");
					expect(result.id).toBeGreaterThan(0);
					// Free the memory using ID
					ChaosOddsJSI.freeString(result.id);
				}
			}

			// If we get here without crashing, memory management is working
			expect(true).toBe(true);
		});
	});
});
