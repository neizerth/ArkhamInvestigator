import { pick } from "ramda";
import type {
	ChaosBagOddsToken,
	ChaosOddsCache,
	ChaosOddsTokenGroupCount,
} from "../../../model";
import { getChaosOddsGroups } from "../group/getChaosOddsGroups";
import { mapRegularChaosBagModifier } from "./mapRegularChaosBagModifier";
import { mapRevealChaosBagModifier } from "./revealMore";

type Options = {
	tokens: ChaosBagOddsToken[];
	revealedFrostCount: number;
};

export const getChaosBagModifiers = (options: Options) => {
	const { tokens } = options;
	const cache: ChaosOddsCache = [];
	const total = tokens.length;
	const groups = getChaosOddsGroups(tokens);
	const availableMap = groups.reduce((acc, group) => {
		acc[group.groupIndex] = group.count;
		return acc;
	}, {} as ChaosOddsTokenGroupCount);

	mapRegularChaosBagModifier({
		groups,
		total,
		cache,
		availableMap,
	});

	const revealOptions = {
		...options,
		groups,
		cache,
	};

	mapRevealChaosBagModifier(revealOptions);
	// mapReveal2MoreChaosBagModifier(revealOptions);

	return cache.map(pick(["modifier", "probability"]));

	// const regularTokens = tokens.filter(() => );
};
