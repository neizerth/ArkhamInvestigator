import type {
	ChaosOddsCache,
	ChaosOddsGroup,
} from "@modules/chaos-bag/odds/entities/model";
import memoize from "fast-memoize";
import { multinomial } from "mathjs";

type Options = {
	group: ChaosOddsGroup;
	cache: ChaosOddsCache;
	revealedFrostCount: number;
	maxRevealCount: number;
	total: number;
};

export const mapRevealOneChaosTokenModifier = ({
	group,
	cache,
	revealedFrostCount = 0,
	total,
}: Options) => {
	const getCombinationsCount = memoize((...args: number[]) => {
		return multinomial(args);
	});

	const { token, groupIndex } = group;
	const { value = 0 } = token;

	if (value === "fail") {
		return cache;
	}

	const isFrost = token.type === "frost";

	if (isFrost && revealedFrostCount === 1) {
		return cache;
	}

	const maxCount = isFrost ? 1 : group.count;

	for (let i = 0; i < maxCount; i++) {
		for (let j = 0, length = cache.length; j < length; j++) {
			const item = cache[j];
			// if (value === "success") {
			// 	cache[groupIndex] = [Number.POSITIVE_INFINITY, 0];
			// 	return cache;
			// }

			const unrevealedCount = maxCount - i;

			const valueModifier =
				value === "success" ? Number.POSITIVE_INFINITY : value;

			// const [
			// 	difficulty,
			// 	probability,
			// 	revealMoreTokenCount,
			// 	revealOneTokenCount = 0,
			// ] = cache[cacheKey];

			const { modifier, probability, count, revealMap = {} } = item;
			const leftCount = total - count - i - 1;

			const nextModifier = valueModifier + modifier;
			const revealCount = revealMap[groupIndex] ?? 0;

			const nextRevealMap = {
				...revealMap,
				[groupIndex]: revealCount + 1,
			};

			const countArgs: number[] = Object.values(revealMap);

			// get combinations count
			const nextCount = getCombinationsCount(...countArgs);

			const nextProbability =
				probability * nextCount * (unrevealedCount / leftCount);

			cache.push({
				modifier: nextModifier,
				probability: nextProbability,
				count: nextCount,
				revealMap: nextRevealMap,
			});
		}
	}
	return cache;
};
