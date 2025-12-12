import type { ChaosBagOddsToken } from "../../../model";
import { getChaosOddsGroups } from "../group/getChaosOddsGroups";
import { getRegularChaosBagModifier } from "./getRegularChaosBagModifier";
import { mapRevealOneChaosBagModifier } from "./revealMore";

type Options = {
	tokens: ChaosBagOddsToken[];
	haveFrost: boolean;
	revealedFrostCount: number;
	revealCount: number;
	maxRevealCount: number;
};

export const getChaosBagModifiers = (options: Options) => {
	const { tokens } = options;
	const total = tokens.length;
	const groups = getChaosOddsGroups(tokens);
	const cache = getRegularChaosBagModifier({ groups, total });

	const revealOptions = {
		...options,
		groups,
		cache,
		total,
	};

	mapRevealOneChaosBagModifier(revealOptions);
	// mapReveal2MoreChaosBagModifier(revealOptions);

	return cache;

	// const regularTokens = tokens.filter(() => );
};
