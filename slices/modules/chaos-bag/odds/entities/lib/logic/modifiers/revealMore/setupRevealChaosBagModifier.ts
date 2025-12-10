import type { ChaosOddsGroup } from "@modules/chaos-bag/odds/entities/model";
import { getRegularChaosTokenModifier } from "../getRegularChaosTokenModifier";

type Options = {
	groups: ChaosOddsGroup[];
	cache: Record<string, number>;
	haveFrost: boolean;
	revealedFrostCount: number;
	revealCount: number;
};

export const setupRevealChaosBagModifier = (options: Options) => {
	const { revealCount = 1, groups, cache } = options;

	const maxRevealCount = groups.reduce((acc, group) => {
		return acc + group.token.revealCount - 1;
	}, revealCount);

	for (let i = 1; i < maxRevealCount; i++) {
		mapChaosBagModifierIteration({
			...options,
			groups,
			index: i,
		});
	}

	return cache;
};

type IterationOptions = Options & {
	index: number;
};

export const mapChaosBagModifierIteration = ({
	cache,
	groups,
	haveFrost,
	revealedFrostCount,
	index,
}: IterationOptions) => {
	for (const group of groups) {
		const isFrost = group.token.type === "frost";
		const checkFrost = haveFrost && isFrost;
		if (checkFrost && revealedFrostCount > 0) {
			continue;
		}
		const { token, groupIndex } = group;
		const modifier = getRegularChaosTokenModifier(token);
		for (const key in cache) {
			// skip frost if it's the first reveal and the group is the same
			if (checkFrost && index > 1 && key.includes(groupIndex)) {
				continue;
			}
			const cacheKey = groupIndex.concat(key);
			cache[cacheKey] += modifier;
		}
	}
	return cache;
};
