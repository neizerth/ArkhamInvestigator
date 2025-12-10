import type { ChaosBagOddsToken } from "../../../../model";
import { getChaosOddsGroups } from "../../group/getChaosOddsGroups";
import { getRegularChaosBagModifier } from "../getRegularChaosBagModifier";

describe("getRegularChaosBagModifier", () => {
	it("should return 11 keys including 'a' when 11 different tokens are provided", () => {
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

		const groups = getChaosOddsGroups(tokens);
		const result = getRegularChaosBagModifier(groups);

		const keys = Object.keys(result);
		expect(keys).toHaveLength(11);
		expect(keys).toContain("a");
	});

	it("should return 3 keys with matching values when 5 tokens include 3 identical ones", () => {
		const tokens: ChaosBagOddsToken[] = [
			{ id: "1", type: "-2", value: -2, revealCount: 0 },
			{ id: "2", type: "-2", value: -2, revealCount: 0 },
			{ id: "3", type: "-2", value: -2, revealCount: 0 },
			{ id: "4", type: "-1", value: -1, revealCount: 0 },
			{ id: "5", type: "bless", value: 2, revealCount: 0 },
		];

		const groups = getChaosOddsGroups(tokens);
		const result = getRegularChaosBagModifier(groups);

		const keys = Object.keys(result);
		expect(keys).toHaveLength(3);

		// Находим группы и проверяем значения
		const groupWithMinusTwo = groups.find(
			(group) => group.token.type === "-2" && group.token.value === -2,
		);
		const groupWithMinusOne = groups.find(
			(group) => group.token.type === "-1" && group.token.value === -1,
		);
		const groupWithBless = groups.find(
			(group) => group.token.type === "bless" && group.token.value === 2,
		);

		expect(groupWithMinusTwo).toBeDefined();
		expect(groupWithMinusOne).toBeDefined();
		expect(groupWithBless).toBeDefined();

		// Проверяем, что значения в кэше совпадают с модификаторами токенов
		expect(result[groupWithMinusTwo?.groupIndex ?? ""]).toBe(-2);
		expect(result[groupWithMinusOne?.groupIndex ?? ""]).toBe(-1);
		expect(result[groupWithBless?.groupIndex ?? ""]).toBe(2);
	});
});
