import type {
	ChaosBagToken,
	ChaosTokenValues,
} from "@modules/chaos-bag/base/shared/model";
import { shuffle } from "fast-shuffle";
import type { RevealedChaosBagToken } from "../../../shared/model";
import { createRevealedToken } from "./createRevealedToken";
import {
	type GetUnrevealedChaosTokensOptions,
	getUnrevealedChaosTokens,
} from "./getUnrevealedChaosTokens";

export type GetRandomChaosTokensOptions = GetUnrevealedChaosTokensOptions & {
	boardId: number;
	count: number;
	values: ChaosTokenValues;
};

export const getRandomChaosTokens = (
	options: GetRandomChaosTokensOptions,
): RevealedChaosBagToken[] => {
	const { count, values } = options;

	const mapToken = createTokenReveal(values);

	const nonRevealed = getUnrevealedChaosTokens(options);
	const unsealed = nonRevealed.filter(({ sealed }) => !sealed);

	const source = shuffle(unsealed);
	const randomTokens = source.slice(0, count);

	return randomTokens.map(mapToken);
};

const createTokenReveal =
	(values: ChaosTokenValues) =>
	(token: ChaosBagToken): RevealedChaosBagToken => {
		const value = values[token.type];

		return createRevealedToken({
			...token,
			value,
		});
	};
