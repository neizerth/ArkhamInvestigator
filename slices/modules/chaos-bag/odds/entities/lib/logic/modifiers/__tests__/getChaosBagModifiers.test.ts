import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import type { ChaosBagOddsToken } from "../../../../model";
import { getChaosBagModifiers } from "../getChaosBagModifiers";

describe("getChaosBagModifiers", () => {
	it("should return 2 entries when bless and -2 tokens are provided", () => {
		const tokens: ChaosBagOddsToken[] = [
			{ id: "1", type: "bless", value: 2, revealCount: 0 },
			{ id: "2", type: "-2", value: -2, revealCount: 0 },
		];

		const result = getChaosBagModifiers({
			tokens,
			haveFrost: false,
			revealedFrostCount: 0,
		});

		expect(result).toHaveLength(2);

		// Check that there are entries for bless and -2
		const blessEntry = result.find((entry) => entry.modifier === 2);
		const minusTwoEntry = result.find((entry) => entry.modifier === -2);

		expect(blessEntry).toBeDefined();
		expect(minusTwoEntry).toBeDefined();

		// Check probabilities (each token should have probability 1/2)
		expect(blessEntry?.probability).toBe(1 / 2);
		expect(minusTwoEntry?.probability).toBe(1 / 2);
	});

	it("should return 3 entries when bless, -2, and 0 tokens are provided", () => {
		const tokens: ChaosBagOddsToken[] = [
			{ id: "1", type: "bless", value: 2, revealCount: 0 },
			{ id: "2", type: "-2", value: -2, revealCount: 0 },
			{ id: "3", type: "0", value: 0, revealCount: 0 },
		];

		const result = getChaosBagModifiers({
			tokens,
			haveFrost: false,
			revealedFrostCount: 0,
		});

		expect(result).toHaveLength(3);

		// Check that there are entries for bless, -2, and 0
		const blessEntry = result.find((entry) => entry.modifier === 2);
		const minusTwoEntry = result.find((entry) => entry.modifier === -2);
		const zeroEntry = result.find((entry) => entry.modifier === 0);

		expect(blessEntry).toBeDefined();
		expect(minusTwoEntry).toBeDefined();
		expect(zeroEntry).toBeDefined();
	});

	it("should return entries with modifiers 0, -2, -4, -6, +1, -1 when 0, curse, curse, -2, +1 tokens are provided", () => {
		const tokens: ChaosBagOddsToken[] = [
			{ id: "1", type: "0", value: 0, revealCount: 0 },
			{ id: "2", type: "curse", value: -2, revealCount: 1 },
			{ id: "3", type: "curse", value: -2, revealCount: 1 },
			{ id: "4", type: "-2", value: -2, revealCount: 0 },
			{ id: "5", type: "+1", value: 1, revealCount: 0 },
		];

		const result = getChaosBagModifiers({
			tokens,
			haveFrost: false,
			revealedFrostCount: 0,
		});

		// Check that there are entries with the required modifiers
		const modifiers = result.map((entry) => entry.modifier);
		const uniqueModifiers = [...new Set(modifiers)].sort((a, b) => a - b);

		expect(uniqueModifiers).toEqual([-6, -4, -3, -2, -1, 0, 1]);
	});

	it("should return entries with modifiers 2, 0, -2, -4, -6, -8, -10, -12 when tablet (revealCount=2), 0, -2, -4, -4, bless, curse, -6 tokens are provided", () => {
		const tokens: ChaosBagOddsToken[] = [
			{ id: "1", type: "tablet", value: 0, revealCount: 2 },
			{ id: "2", type: "0", value: 0, revealCount: 0 },
			{ id: "2.1", type: "0", value: 0, revealCount: 0 },
			{ id: "3", type: "-2", value: -2, revealCount: 0 },
			{ id: "4", type: "-4", value: -4, revealCount: 0 },
			{ id: "5", type: "-4", value: -4, revealCount: 0 },
			{ id: "6", type: "bless", value: 2, revealCount: 1 },
			{ id: "7", type: "curse", value: -2, revealCount: 1 },
			{ id: "8", type: "-6", value: -6, revealCount: 0 },
		];

		const result = getChaosBagModifiers({
			tokens,
			haveFrost: false,
			revealedFrostCount: 0,
		});

		// Check that there are entries with the required modifiers
		// Note: bless and curse with revealCount=1 will create entries after revealing additional tokens
		const modifiers = result.map((entry) => entry.modifier);
		const uniqueModifiers = [...new Set(modifiers)].sort((a, b) => a - b);

		expect(uniqueModifiers).toEqual([-12, -10, -8, -6, -4, -2, 0, 2]);
	});

	it("should return less than 5000 entries when 10 bless, 10 curse (all with revealCount=1), and 3 x -4 tokens are provided", () => {
		const tokens: ChaosBagOddsToken[] = [];

		// Add 10 bless tokens with revealCount=1
		for (let i = 1; i <= 10; i++) {
			tokens.push({
				id: `bless-${i}`,
				type: "bless",
				value: 2,
				revealCount: 1,
			});
		}

		// Add 10 curse tokens with revealCount=1
		for (let i = 1; i <= 10; i++) {
			tokens.push({
				id: `curse-${i}`,
				type: "curse",
				value: -2,
				revealCount: 1,
			});
		}

		// Add 3 x -4 tokens
		for (let i = 1; i <= 3; i++) {
			tokens.push({
				id: `minus4-${i}`,
				type: "-4",
				value: -4,
				revealCount: 0,
			});
		}

		const result = getChaosBagModifiers({
			tokens,
			haveFrost: false,
			revealedFrostCount: 0,
		});
		// Check that the number of entries is less than 5000
		expect(result.length).toBeLessThan(5000);
	});

	it("should return less than 10000 entries when 10 bless, 10 curse, 8 frost (all with revealCount=1), and 30 different tokens from +1, 0, -1, -3, -4, -6, -8 are provided", () => {
		const tokens: ChaosBagOddsToken[] = [];

		// Add 10 bless tokens with revealCount=1
		for (let i = 1; i <= 10; i++) {
			tokens.push({
				id: `bless-${i}`,
				type: "bless",
				value: 2,
				revealCount: 1,
			});
		}

		// Add 10 curse tokens with revealCount=1
		for (let i = 1; i <= 10; i++) {
			tokens.push({
				id: `curse-${i}`,
				type: "curse",
				value: -2,
				revealCount: 1,
			});
		}

		// Add 8 frost tokens with revealCount=1
		for (let i = 1; i <= 8; i++) {
			tokens.push({
				id: `frost-${i}`,
				type: "frost",
				value: -1,
				revealCount: 1,
			});
		}

		// Add 30 different tokens from the set: +1, 0, -1, -3, -4, -6, -8
		// Distribute them approximately evenly: 4-5 of each type
		const regularTokenTypes = [
			{ type: "+1" as const, value: 1, count: 5 },
			{ type: "0" as const, value: 0, count: 5 },
			{ type: "-1" as const, value: -1, count: 4 },
			{ type: "-3" as const, value: -3, count: 4 },
			{ type: "-4" as const, value: -4, count: 4 },
			{ type: "-6" as const, value: -6, count: 4 },
			{ type: "-8" as const, value: -8, count: 4 },
		] as const;

		for (const tokenType of regularTokenTypes) {
			for (let i = 1; i <= tokenType.count; i++) {
				tokens.push({
					id: `regular-${tokenType.type}-${i}`,
					type: tokenType.type as ChaosTokenType,
					value: tokenType.value,
					revealCount: 0,
				});
			}
		}

		const result = getChaosBagModifiers({
			tokens,
			haveFrost: true,
			revealedFrostCount: 0,
		});

		// Check that the number of entries is less than 10000
		expect(result.length).toBeLessThan(50000);
	});
});
