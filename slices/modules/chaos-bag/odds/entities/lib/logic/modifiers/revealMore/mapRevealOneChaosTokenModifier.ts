import type { ChaosOddsGroup } from "@modules/chaos-bag/odds/entities/model";

type Options = {
	group: ChaosOddsGroup;
	cache: Record<string, number>;
	revealedFrostCount: number;
	maxRevealCount: number;
};

export const mapRevealOneChaosTokenModifier = ({
	group,
	cache,
	revealedFrostCount = 0,
}: Options) => {
	const { groupIndex, token } = group;
	const { value = 0 } = token;

	if (value === "fail") {
		cache[groupIndex] = Number.NEGATIVE_INFINITY;
		return cache;
	}
	if (value === "success") {
		cache[groupIndex] = Number.POSITIVE_INFINITY;
		return cache;
	}

	const isFrost = token.type === "frost";

	if (isFrost && revealedFrostCount === 1) {
		cache[groupIndex] = Number.NEGATIVE_INFINITY;
		return cache;
	}

	const maxCount = isFrost ? 1 : group.count;

	for (let i = 0; i < maxCount; i++) {
		for (const key in cache) {
			const cacheKey = groupIndex.concat(key);

			cache[cacheKey] += value;
		}
	}
	return cache;
};
