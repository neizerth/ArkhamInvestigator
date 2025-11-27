import type { RevealedChaosBagToken } from "@modules/chaos-bag/reveal/base/shared/model";
import type { PickPartial } from "@shared/model";

export type ChaosBagOddsToken = PickPartial<
	RevealedChaosBagToken,
	"revealId"
> & {
	revealCount: number;
};
