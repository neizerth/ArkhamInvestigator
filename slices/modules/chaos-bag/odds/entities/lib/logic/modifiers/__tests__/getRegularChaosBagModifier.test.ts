import type {
	ChaosBagOddsToken,
	ChaosOddsTokenGroupCount,
} from "../../../../model";
import { getChaosOddsGroups } from "../../group/getChaosOddsGroups";
import { mapRegularChaosBagModifier } from "../mapRegularChaosBagModifier";

describe("getRegularChaosBagModifier", () => {
	it("should return 11 items when 11 different tokens are provided and include group with index 'a'", () => {
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
		const availableMap = groups.reduce((acc, group) => {
			acc[group.groupIndex] = group.count;
			return acc;
		}, {} as ChaosOddsTokenGroupCount);
		const result = mapRegularChaosBagModifier({
			cache: [],
			groups,
			total: tokens.length,
			availableMap,
		});

		expect(result).toHaveLength(11);

		// Проверяем, что есть группа с индексом 'a' (10 в 36-ричной системе)
		const groupWithIndexA = groups.find((group) => group.groupIndex === "a");
		expect(groupWithIndexA).toBeDefined();
	});

	it("should return 3 items with matching modifier values when 5 tokens include 3 identical ones", () => {
		const tokens: ChaosBagOddsToken[] = [
			{ id: "1", type: "-2", value: -2, revealCount: 0 },
			{ id: "2", type: "-2", value: -2, revealCount: 0 },
			{ id: "3", type: "-2", value: -2, revealCount: 0 },
			{ id: "4", type: "-1", value: -1, revealCount: 0 },
			{ id: "5", type: "bless", value: 2, revealCount: 0 },
		];

		const groups = getChaosOddsGroups(tokens);
		const availableMap = groups.reduce((acc, group) => {
			acc[group.groupIndex] = group.count;
			return acc;
		}, {} as ChaosOddsTokenGroupCount);
		const result = mapRegularChaosBagModifier({
			cache: [],
			groups,
			total: tokens.length,
			availableMap,
		});

		expect(result).toHaveLength(3);

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

		// Находим соответствующие элементы в результате по индексу группы
		const resultIndexMinusTwo = groups.findIndex(
			(group) => group === groupWithMinusTwo,
		);
		const resultIndexMinusOne = groups.findIndex(
			(group) => group === groupWithMinusOne,
		);
		const resultIndexBless = groups.findIndex(
			(group) => group === groupWithBless,
		);

		// Проверяем, что значения модификаторов совпадают
		expect(result[resultIndexMinusTwo]?.modifier).toBe(-2);
		expect(result[resultIndexMinusOne]?.modifier).toBe(-1);
		expect(result[resultIndexBless]?.modifier).toBe(2);
	});

	it("should return correct modifier, probability and count for group of three 0 tokens from bag [0,0,0,-2,-2,-4,-5]", () => {
		const tokens: ChaosBagOddsToken[] = [
			{ id: "1", type: "0", value: 0, revealCount: 0 },
			{ id: "2", type: "0", value: 0, revealCount: 0 },
			{ id: "3", type: "0", value: 0, revealCount: 0 },
			{ id: "4", type: "-2", value: -2, revealCount: 0 },
			{ id: "5", type: "-2", value: -2, revealCount: 0 },
			{ id: "6", type: "-4", value: -4, revealCount: 0 },
			{ id: "7", type: "-5", value: -5, revealCount: 0 },
		];

		const groups = getChaosOddsGroups(tokens);
		const availableMap = groups.reduce((acc, group) => {
			acc[group.groupIndex] = group.count;
			return acc;
		}, {} as ChaosOddsTokenGroupCount);
		const result = mapRegularChaosBagModifier({
			cache: [],
			groups,
			total: tokens.length,
			availableMap,
		});

		// Находим группу с жетонами 0
		const groupWithZero = groups.find(
			(group) => group.token.type === "0" && group.token.value === 0,
		);

		expect(groupWithZero).toBeDefined();
		expect(groupWithZero?.count).toBe(3);

		// Находим индекс этой группы в массиве groups
		const groupIndex = groups.findIndex((group) => group === groupWithZero);

		// Проверяем первую запись в результате (должна соответствовать группе с 0)
		const firstEntry = result[groupIndex];

		expect(firstEntry).toBeDefined();
		expect(firstEntry?.modifier).toBe(0);
		expect(firstEntry?.probability).toBe(3 / 7);
	});
});
