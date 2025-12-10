import type { ChaosBagOddsToken } from "../../model";
import { createChaosOddsGroupFilter } from "./group";

type Options = {
	revealCount?: number;
	maxRevealCount?: number;
	token: ChaosBagOddsToken;
	// with the same type or revealCount = 0
	total: number;
	typeCount: number;
	tokens: ChaosBagOddsToken[];
};

export const getChaosTokenRevealOdds = (options: Options) => {
	const { token, revealCount = 1, maxRevealCount = 1 } = options;

	const tokens = options.tokens.filter(({ type, revealCount }) => {
		if (type === token.type) {
			return true;
		}
		return revealCount === 0;
	});

	const comparator = createChaosOddsGroupFilter(token);
	const typeCount = options.tokens.filter(comparator).length;

	const total = tokens.length;
	let baseProbability = typeCount / total;

	if (revealCount > 1) {
		const maxValue = Math.min(revealCount, typeCount, total - 1);

		for (let i = 1; i < maxValue; i++) {
			baseProbability *= (typeCount - i) / (total - i);
		}
	}

	if (maxRevealCount < 2) {
		return baseProbability;
	}

	let probability = 0;
	// const maxRevealCount = special.reduce(
	// 	(max, { revealCount }) => max + revealCount - 1,
	// 	1,
	// );

	for (let revealCount = 1; revealCount <= maxRevealCount; revealCount++) {
		const p = 1 - (1 - baseProbability) ** revealCount;
		probability += p;
	}

	return probability / maxRevealCount;
};
