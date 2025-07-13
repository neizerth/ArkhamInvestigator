import type { ChaosBagToken } from "@modules/chaos-bag/base/shared/model";
import { idIncludes } from "@shared/lib/util";
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
