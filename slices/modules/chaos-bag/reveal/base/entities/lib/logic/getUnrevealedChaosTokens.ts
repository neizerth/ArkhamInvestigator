import type { ChaosBagToken } from "@features/game/chaos-bag/model";
import { idIncludes } from "@shared/lib";
import { reject } from "ramda";

export type GetUnrevealedChaosTokensOptions = {
	contents: ChaosBagToken[];
	revealedIds: string[];
};

export const getUnrevealedChaosTokens = ({
	contents,
	revealedIds,
}: GetUnrevealedChaosTokensOptions) => {
	return reject(idIncludes(revealedIds), contents);
};
