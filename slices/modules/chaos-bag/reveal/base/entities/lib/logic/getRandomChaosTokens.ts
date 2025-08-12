import type { ChaosTokenValues } from "@modules/chaos-bag/base/shared/model";
import { shuffle } from "fast-shuffle";
import { isNotNil } from "ramda";
import { v4 } from "uuid";
import type { RevealedChaosBagToken } from "../../../shared/model";
import {
	type GetUnrevealedChaosTokensOptions,
	getUnrevealedChaosTokens,
} from "./getUnrevealedChaosTokens";

export type GetRandomChaosTokensOptions = GetUnrevealedChaosTokensOptions & {
	count: number;
	values: ChaosTokenValues;
};

export const getRandomChaosTokens = (
	options: GetRandomChaosTokensOptions,
): RevealedChaosBagToken[] => {
	const { count, values } = options;

	const nonRevealed = getUnrevealedChaosTokens(options);
	const unsealed = nonRevealed.filter(({ sealed }) => !sealed);

	const source = shuffle(unsealed);
	const tokens = source.slice(0, count);

	return tokens
		.map((token) => {
			const value = values[token.type];

			return {
				...token,
				revealId: v4(),
				value,
			};
		})
		.filter(isNotNil);
};
