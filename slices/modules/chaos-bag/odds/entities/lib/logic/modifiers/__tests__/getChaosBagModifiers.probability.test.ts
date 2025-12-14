import type { ChaosBagOddsToken } from "../../../../model";
import { getChaosBagModifiers } from "../getChaosBagModifiers";

describe("getChaosBagModifiers - probability check for -2, -4, -6", () => {
	it("should return 3 entries with modifiers -2, -4, -6, each with probability 1/3", () => {
		const tokens: ChaosBagOddsToken[] = [
			{ id: "1", type: "-2", value: -2, revealCount: 0 },
			{ id: "2", type: "-4", value: -4, revealCount: 0 },
			{ id: "3", type: "-6", value: -6, revealCount: 0 },
		];

		const result = getChaosBagModifiers({
			tokens,
			revealedFrostCount: 0,
		});

		expect(result).toHaveLength(3);

		// Check that there are entries for -2, -4, and -6
		const minusTwoEntry = result.find((entry) => entry.modifier === -2);
		const minusFourEntry = result.find((entry) => entry.modifier === -4);
		const minusSixEntry = result.find((entry) => entry.modifier === -6);

		expect(minusTwoEntry).toBeDefined();
		expect(minusFourEntry).toBeDefined();
		expect(minusSixEntry).toBeDefined();

		// Check probabilities (each token should have probability 1/3)
		const expectedProbability = 1 / 3;
		expect(minusTwoEntry?.probability).toBe(expectedProbability);
		expect(minusFourEntry?.probability).toBe(expectedProbability);
		expect(minusSixEntry?.probability).toBe(expectedProbability);

		// Verify that probabilities sum to 1
		const totalProbability = result.reduce(
			(sum, entry) => sum + entry.probability,
			0,
		);
		expect(totalProbability).toBeCloseTo(1, 10);
	});

	it("should return correct probability for modifier 0 when tokens are -2, bless, 0", () => {
		const tokens: ChaosBagOddsToken[] = [
			{ id: "1", type: "-2", value: -2, revealCount: 0 },
			{ id: "2", type: "bless", value: 2, revealCount: 1 },
			{ id: "3", type: "0", value: 0, revealCount: 0 },
		];

		const result = getChaosBagModifiers({
			tokens,
			revealedFrostCount: 0,
		});

		const zeroEntries = result.filter((entry) => entry.modifier === 0);

		expect(zeroEntries.length).toBeGreaterThan(0);

		// Sum all probabilities for modifier 0
		const totalZeroProbability = zeroEntries.reduce(
			(sum, entry) => sum + entry.probability,
			0,
		);

		const expectedProbability = 1 / 2;

		expect(totalZeroProbability).toBeCloseTo(expectedProbability, 10);
	});

	it("should return correct probability for modifier -2 when tokens are 0, bless, -6, -2", () => {
		const tokens: ChaosBagOddsToken[] = [
			{ id: "1", type: "0", value: 0, revealCount: 0 },
			{ id: "2", type: "bless", value: 2, revealCount: 1 },
			{ id: "3", type: "-6", value: -6, revealCount: 0 },
			{ id: "4", type: "-2", value: -2, revealCount: 0 },
		];

		const result = getChaosBagModifiers({
			tokens,
			revealedFrostCount: 0,
		});

		// Find all entries with modifier -2 (there might be multiple)
		const minusTwoEntries = result.filter((entry) => entry.modifier === -2);

		expect(minusTwoEntries.length).toBeGreaterThan(0);

		// Sum all probabilities for modifier -2
		const totalMinusTwoProbability = minusTwoEntries.reduce(
			(sum, entry) => sum + entry.probability,
			0,
		);

		// Expected probability: 1/3
		// This suggests that when calculating probability of drawing regular tokens,
		// tokens with revealCount > 0 (like bless) should not be counted in the denominator.
		// So: direct draw of -2 from regular tokens (0, -6, -2) = 1/3
		// Note: bless + -2 = 0 (not -2), so there's no path through bless to get -2
		const expectedProbability = 1 / 4;

		expect(totalMinusTwoProbability).toBeCloseTo(expectedProbability, 10);
	});

	it("should return correct probability for modifier -4 when tokens are curse, curse, 0, bless", () => {
		const tokens: ChaosBagOddsToken[] = [
			{ id: "1", type: "curse", value: -2, revealCount: 1 },
			{ id: "2", type: "curse", value: -2, revealCount: 1 },
			{ id: "3", type: "0", value: 0, revealCount: 0 },
			{ id: "4", type: "bless", value: 2, revealCount: 1 },
		];

		const result = getChaosBagModifiers({
			tokens,
			revealedFrostCount: 0,
		});

		// Find all entries with modifier -4 (there might be multiple)
		const minusFourEntries = result.filter((entry) => entry.modifier === -4);

		expect(minusFourEntries.length).toBeGreaterThan(0);

		// Sum all probabilities for modifier -4
		const totalMinusFourProbability = minusFourEntries.reduce(
			(sum, entry) => sum + entry.probability,
			0,
		);

		// Expected probability calculation:
		// Modifier -4 can be obtained by: curse + curse = -2 + -2 = -4
		// - Draw first curse: 2/4 = 1/2 (2 curse tokens out of 4 total)
		// - After drawing first curse, remaining tokens: curse, 0, bless (3 tokens)
		// - Draw second curse: 1/3
		// Total: (1/2) * (1/3) = 1/6
		const expectedProbability = (2 / 4) * (1 / 3);

		expect(totalMinusFourProbability).toBeCloseTo(expectedProbability, 10);
	});
});
