import type { ChaosBagOddsToken } from "../../../model";
import { getChaosOddsGroups } from "../group/getChaosOddsGroups";
import { getRegularChaosBagModifier } from "./getRegularChaosBagModifier";
import {
	mapRevealOneChaosBagModifier,
	setupRevealChaosBagModifier,
} from "./revealMore";

type Options = {
	tokens: ChaosBagOddsToken[];
	haveFrost: boolean;
	revealedFrostCount: number;
	revealCount: number;
	maxRevealCount: number;
};

export const getChaosBagModifiers = (options: Options) => {
	const { tokens } = options;
	const groups = getChaosOddsGroups(tokens);
	const cache = getRegularChaosBagModifier(groups);

	const revealOptions = {
		...options,
		groups,
		cache,
	};

	setupRevealChaosBagModifier(revealOptions);
	mapRevealOneChaosBagModifier(revealOptions);

	return cache;

	// const regularTokens = tokens.filter(() => );
};
