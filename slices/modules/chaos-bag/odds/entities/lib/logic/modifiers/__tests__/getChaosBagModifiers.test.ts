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
			revealCount: 0,
			maxRevealCount: 0,
		});

		expect(result).toHaveLength(2);

		// Проверяем, что есть записи для bless и -2
		const blessEntry = result.find((entry) => entry.modifier === 2);
		const minusTwoEntry = result.find((entry) => entry.modifier === -2);

		expect(blessEntry).toBeDefined();
		expect(minusTwoEntry).toBeDefined();

		// Проверяем вероятности (каждый токен должен иметь вероятность 1/2)
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
			revealCount: 0,
			maxRevealCount: 0,
		});

		expect(result).toHaveLength(3);

		// Проверяем, что есть записи для bless, -2, и 0
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
			revealCount: 0,
			maxRevealCount: 0,
		});

		// Проверяем, что есть записи с нужными модификаторами
		const modifiers = result.map((entry) => entry.modifier);
		const uniqueModifiers = [...new Set(modifiers)].sort((a, b) => a - b);

		expect(uniqueModifiers).toEqual([-6, -4, -3, -2, -1, 0, 1]);
	});
});
