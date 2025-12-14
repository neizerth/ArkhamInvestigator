import type { ChaosBagOddsToken, ChaosOddsCache } from "../../../../../model";
import { getChaosOddsGroups } from "../../../group/getChaosOddsGroups";
import { mapRevealOneChaosTokenModifier } from "../mapRevealOneChaosTokenModifier";

describe("mapRevealOneChaosTokenModifier", () => {
	it("should return empty cache when adding 8 frost tokens with revealedFrostCount = 1", () => {
		const tokens: ChaosBagOddsToken[] = [
			{ id: "1", type: "frost", value: -1, revealCount: 0 },
			{ id: "2", type: "frost", value: -1, revealCount: 0 },
			{ id: "3", type: "frost", value: -1, revealCount: 0 },
			{ id: "4", type: "frost", value: -1, revealCount: 0 },
			{ id: "5", type: "frost", value: -1, revealCount: 0 },
			{ id: "6", type: "frost", value: -1, revealCount: 0 },
			{ id: "7", type: "frost", value: -1, revealCount: 0 },
			{ id: "8", type: "frost", value: -1, revealCount: 0 },
		];

		const groups = getChaosOddsGroups(tokens);
		const frostGroup = groups.find((group) => group.token.type === "frost");

		expect(frostGroup).toBeDefined();
		expect(frostGroup?.count).toBe(8);

		if (!frostGroup) {
			throw new Error("frostGroup is undefined");
		}

		const cache: ChaosOddsCache = [];

		const result = mapRevealOneChaosTokenModifier({
			group: frostGroup,
			cache,
			revealedFrostCount: 1,
		});

		expect(result).toHaveLength(0);
		expect(cache).toHaveLength(0);
	});

	it("should return empty cache when adding 1 frost token with revealedFrostCount = 1", () => {
		const tokens: ChaosBagOddsToken[] = [
			{ id: "1", type: "frost", value: -1, revealCount: 0 },
		];

		const groups = getChaosOddsGroups(tokens);
		const frostGroup = groups.find((group) => group.token.type === "frost");

		expect(frostGroup).toBeDefined();
		expect(frostGroup?.count).toBe(1);

		if (!frostGroup) {
			throw new Error("frostGroup is undefined");
		}

		const cache: ChaosOddsCache = [];

		const result = mapRevealOneChaosTokenModifier({
			group: frostGroup,
			cache,
			revealedFrostCount: 1,
		});

		expect(result).toHaveLength(0);
		expect(cache).toHaveLength(0);
	});

	it("should return 6 cache entries when adding 5 bless tokens to cache with 2 +1 tokens", () => {
		const blessTokens: ChaosBagOddsToken[] = [
			{ id: "1", type: "bless", value: 2, revealCount: 1 },
			{ id: "2", type: "bless", value: 2, revealCount: 1 },
			{ id: "3", type: "bless", value: 2, revealCount: 1 },
			{ id: "4", type: "bless", value: 2, revealCount: 1 },
			{ id: "5", type: "bless", value: 2, revealCount: 1 },
		];

		const plusOneTokens: ChaosBagOddsToken[] = [
			{ id: "6", type: "+1", value: 1, revealCount: 0 },
			{ id: "7", type: "+1", value: 1, revealCount: 0 },
		];

		const allTokens = [...blessTokens, ...plusOneTokens];
		const groups = getChaosOddsGroups(allTokens);

		const blessGroup = groups.find((group) => group.token.type === "bless");
		const plusOneGroup = groups.find((group) => group.token.type === "+1");

		expect(blessGroup).toBeDefined();
		expect(blessGroup?.count).toBe(5);
		expect(plusOneGroup).toBeDefined();
		expect(plusOneGroup?.count).toBe(2);

		if (!blessGroup || !plusOneGroup) {
			throw new Error("blessGroup or plusOneGroup is undefined");
		}

		const total = 7;

		// Создаем начальный cache с 1 элементом для 2 жетонов +1
		const cache: ChaosOddsCache = [
			{
				modifier: 1,
				probability: 2 / total,
				availableCount: total - 1,
				availableMap: {
					[plusOneGroup.groupIndex]: 1,
					[blessGroup.groupIndex]: 5,
				},
			},
		];

		mapRevealOneChaosTokenModifier({
			group: blessGroup,
			cache,
			revealedFrostCount: 0,
		});

		expect(cache).toHaveLength(32);
	});
});
