import type { RevealedChaosBagToken } from "@modules/chaos-bag/reveal/base/shared/model";
import type { PickPartial } from "@shared/model";

export type ChaosBagOddsToken = PickPartial<
	RevealedChaosBagToken,
	"revealId"
> & {
	revealCount: number;
};

export type ChaosOddsGroup = {
	groupIndex: string;
	token: ChaosBagOddsToken;
	count: number;
};

export type ChaosOddsTokenGroupCount = Record<string, number>;

export type ChaosOddsCacheItem = {
	modifier: number;
	probability: number;
	availableMap: ChaosOddsTokenGroupCount;
	availableCount: number;
	revealMap?: ChaosOddsTokenGroupCount;
};

export type ChaosOddsCache = ChaosOddsCacheItem[];

export type ChaosOddsPerformanceTestGroup = {
	id: string;
	tokens: ChaosBagOddsToken[];
};

export type ChaosOddsPerformanceTest = ChaosOddsPerformanceTestGroup &
	(
		| {
				type: "all";
		  }
		| {
				type: "single";
				difficulty: number;
				skillValue: number;
		  }
	);
