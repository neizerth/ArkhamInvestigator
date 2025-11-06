import type {
	ChaosBagToken,
	ChaosTokenValues,
} from "@modules/chaos-bag/base/shared/model";
import { shuffle } from "fast-shuffle";
import { v4 } from "uuid";
import type { RevealedChaosBagToken } from "../../../shared/model";
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
	const { count, values, contents, boardId } = options;

	const mapToken = createTokenReveal(values);

	const nonRevealed = getUnrevealedChaosTokens(options);
	const unsealed = nonRevealed.filter(({ sealed }) => !sealed);

	const primaryTokens = contents.filter(({ revealPriority, sealData }) => {
		if (!revealPriority) {
			return false;
		}

		if (sealData?.type === "investigator" && sealData.boardId !== boardId) {
			return false;
		}

		return true;
	});

	const primary = primaryTokens.slice(0, count);

	const restCount = count - primary.length;

	if (restCount === 0) {
		return primary.map(mapToken);
	}

	const rest = unsealed.filter(
		({ id }) => !primary.some((token) => token.id === id),
	);

	const source = shuffle(rest);
	const randomTokens = source.slice(0, restCount);

	return [...primary, ...randomTokens].map(mapToken);
};

const createTokenReveal =
	(values: ChaosTokenValues) =>
	(token: ChaosBagToken): RevealedChaosBagToken => {
		const value = values[token.type];

		return {
			...token,
			revealId: v4(),
			value,
			sealed: false,
			sealData: null,
		};
	};
