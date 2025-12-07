import type { ChaosBagOddsToken } from "../../../model";

type Options = {
	token: ChaosBagOddsToken;
	tokens: ChaosBagOddsToken[];
};

export const getChaosTokenRevealOdds = (options: Options) => {
	const { token } = options;

	const tokens = options.tokens.filter(({ type, revealCount }) => {
		if (type === token.type) {
			return true;
		}
		return revealCount === 0;
	});

	const comparator = createTokenComparator(token);
	const typeCount = options.tokens.filter(comparator).length;

	const total = tokens.length;
	const baseProbability = typeCount / total;
	const special = options.tokens.filter(({ revealCount }) => revealCount > 1);

	if (special.length === 0) {
		return baseProbability;
	}

	let probability = 0;
	const maxRevealCount = special.reduce(
		(max, { revealCount }) => max + revealCount - 1,
		1,
	);

	for (let revealCount = 1; revealCount <= maxRevealCount; revealCount++) {
		const p = 1 - (1 - baseProbability) ** revealCount;
		probability += p;
	}

	return probability / maxRevealCount;
};

const createTokenComparator =
	({ type, revealCount, value }: ChaosBagOddsToken) =>
	(token: ChaosBagOddsToken) => {
		if (token.type !== type) {
			return false;
		}

		if (token.revealCount !== revealCount) {
			return false;
		}

		if (token.value !== value) {
			return false;
		}

		return true;
	};
