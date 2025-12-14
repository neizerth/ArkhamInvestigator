import type {
	ChaosOddsCache,
	ChaosOddsGroup,
	ChaosOddsTokenGroupCount,
} from "../../../model";
import { getRegularChaosTokenModifier } from "./getRegularChaosTokenModifier";

type Options = {
	groups: ChaosOddsGroup[];
	total: number;
	cache?: ChaosOddsCache;
	availableMap: ChaosOddsTokenGroupCount;
};

export const mapRegularChaosBagModifier = (options: Options) => {
	const { groups, total, cache = [], availableMap } = options;

	for (const group of groups) {
		const { token, count } = group;
		// Skip tokens with revealCount > 0, they are handled by mapRevealChaosBagModifier
		if (token.revealCount > 0) {
			continue;
		}
		const probability = count / total;
		const modifier = getRegularChaosTokenModifier(token);
		cache.push({
			modifier,
			probability,
			availableCount: total - 1,
			availableMap: {
				...availableMap,
				[group.groupIndex]: availableMap[group.groupIndex] - 1,
			},
		});
	}

	return cache;
};
