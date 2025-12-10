import type { ChaosBagOddsToken } from "../../../../model";
import { getChaosOddsGroups } from "../getChaosOddsGroups";

describe("getChaosOddsGroups", () => {
	it("should return 2 groups when tokens are -4, -4, -4 but one has value +4", () => {
		const tokens: ChaosBagOddsToken[] = [
			{
				id: "1",
				type: "-4",
				value: -4,
				revealCount: 0,
			},
			{
				id: "2",
				type: "-4",
				value: -4,
				revealCount: 0,
			},
			{
				id: "3",
				type: "-4",
				value: 4,
				revealCount: 0,
			},
		];

		const result = getChaosOddsGroups(tokens);

		expect(result).toHaveLength(2);

		// Первая группа: 2 жетона с value = -4
		const groupWithMinusFour = result.find((group) => group.token.value === -4);
		expect(groupWithMinusFour).toBeDefined();
		expect(groupWithMinusFour?.count).toBe(2);

		// Вторая группа: 1 жетон с value = +4
		const groupWithPlusFour = result.find((group) => group.token.value === 4);
		expect(groupWithPlusFour).toBeDefined();
		expect(groupWithPlusFour?.count).toBe(1);
	});

	it("should return 11 groups with different tokens and include key 'a'", () => {
		const tokens: ChaosBagOddsToken[] = [
			{ id: "1", type: "-1", value: -1, revealCount: 0 },
			{ id: "2", type: "-2", value: -2, revealCount: 0 },
			{ id: "3", type: "-3", value: -3, revealCount: 0 },
			{ id: "4", type: "-4", value: -4, revealCount: 0 },
			{ id: "5", type: "-5", value: -5, revealCount: 0 },
			{ id: "6", type: "0", value: 0, revealCount: 0 },
			{ id: "7", type: "+1", value: 1, revealCount: 0 },
			{ id: "8", type: "bless", value: 2, revealCount: 0 },
			{ id: "9", type: "curse", value: -2, revealCount: 0 },
			{ id: "10", type: "skull", value: -2, revealCount: 0 },
			{ id: "11", type: "cultist", value: -2, revealCount: 0 },
		];

		const result = getChaosOddsGroups(tokens);

		expect(result).toHaveLength(11);

		const groupIndexes = result.map((group) => group.groupIndex);
		expect(groupIndexes).toHaveLength(11);
		expect(groupIndexes).toContain("a");
	});

	it("should return 3 groups when 5 tokens include 3 identical ones", () => {
		const tokens: ChaosBagOddsToken[] = [
			{ id: "1", type: "-2", value: -2, revealCount: 0 },
			{ id: "2", type: "-2", value: -2, revealCount: 0 },
			{ id: "3", type: "-2", value: -2, revealCount: 0 },
			{ id: "4", type: "-1", value: -1, revealCount: 0 },
			{ id: "5", type: "bless", value: 2, revealCount: 0 },
		];

		const result = getChaosOddsGroups(tokens);

		expect(result).toHaveLength(3);

		// Группа с 3 одинаковыми жетонами -2
		const groupWithMinusTwo = result.find(
			(group) => group.token.type === "-2" && group.token.value === -2,
		);
		expect(groupWithMinusTwo).toBeDefined();
		expect(groupWithMinusTwo?.count).toBe(3);

		// Группа с 1 жетоном -1
		const groupWithMinusOne = result.find(
			(group) => group.token.type === "-1" && group.token.value === -1,
		);
		expect(groupWithMinusOne).toBeDefined();
		expect(groupWithMinusOne?.count).toBe(1);

		// Группа с 1 жетоном bless
		const groupWithBless = result.find(
			(group) => group.token.type === "bless" && group.token.value === 2,
		);
		expect(groupWithBless).toBeDefined();
		expect(groupWithBless?.count).toBe(1);
	});
});
