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

export type ChaosOddsCacheRevealMap = Record<string, number>;

export type ChaosOddsCacheItem = {
	modifier: number;
	probability: number;
	count: number;
	revealMap?: ChaosOddsCacheRevealMap;
};

export type ChaosOddsCache = ChaosOddsCacheItem[];
