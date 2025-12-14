import type { ChaosOddsCache, ChaosOddsGroup } from "../../../../model";
import { mapRevealOneChaosTokenModifier } from "./mapRevealOneChaosTokenModifier";

type Options = {
	groups: ChaosOddsGroup[];
	revealedFrostCount: number;
	maxRevealCount: number;
	cache?: ChaosOddsCache;
};

export const mapRevealOneChaosBagModifier = (options: Options) => {
	const { groups, cache } = options;
	const revealOneGroups = groups.filter(({ token }) => token.revealCount === 1);
	// const maxCount = Math.max()

	for (const group of revealOneGroups) {
		mapRevealOneChaosTokenModifier({
			...options,
			group,
		});
	}

	return cache;
};
