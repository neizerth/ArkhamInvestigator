import {
	type GetUnrevealedChaosTokensOptions,
	getUnrevealedChaosTokens,
} from "./getUnrevealedChaosTokens";

export type CanRevealChaosTokensOptions = GetUnrevealedChaosTokensOptions & {
	count: number;
};

export const canRevealChaosTokens = (options: CanRevealChaosTokensOptions) => {
	const { count } = options;
	const available = getUnrevealedChaosTokens(options).length;

	const canReveal = available >= count;

	return {
		canReveal,
		available,
		count,
	};
};
