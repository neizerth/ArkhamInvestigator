import type { ChaosOddsCache, ChaosOddsGroup } from "../../../model";
import { getRegularChaosTokenModifier } from "./getRegularChaosTokenModifier";

type Options = {
	groups: ChaosOddsGroup[];
	total: number;
};

export const getRegularChaosBagModifier = (options: Options) => {
	const { groups, total } = options;
	const cache: ChaosOddsCache = [];

	for (const group of groups) {
		const { token, count } = group;
		const probability = count / total;
		const modifier = getRegularChaosTokenModifier(token);
		cache.push({
			modifier,
			probability,
			count: 1,
		});
	}

	return cache;
};
