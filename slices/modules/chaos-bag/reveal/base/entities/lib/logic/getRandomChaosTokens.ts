import { shuffle } from "fast-shuffle";
import {
	type GetUnrevealedChaosTokensOptions,
	getUnrevealedChaosTokens,
} from "./getUnrevealedChaosTokens";

export type GetRandomChaosTokensOptions = GetUnrevealedChaosTokensOptions & {
	count: number;
};

export const getRandomChaosTokens = (options: GetRandomChaosTokensOptions) => {
	const { count } = options;

	const nonRevealed = getUnrevealedChaosTokens(options);
	const unsealed = nonRevealed.filter(({ sealed }) => !sealed);

	const tokens = shuffle(unsealed).slice(0, count);

	return tokens;
};
