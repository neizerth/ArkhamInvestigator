import type { RevealedChaosBagTokenData } from "@modules/chaos-bag/reveal/base/shared/model";

export type ChaosBagOddsToken = RevealedChaosBagTokenData & {
	revealCount: number;
};
