import { selectAvailableChaosTokens } from "@modules/chaos-bag/base/entities/lib";
import { selectRevealedTokenIds } from "@modules/chaos-bag/reveal/base/shared/lib";
import type { RootState } from "@shared/model";

export const selectUnrevealedChaosTokensCount = (state: RootState) => {
	const revealed = selectRevealedTokenIds(state);
	const contents = selectAvailableChaosTokens(state);
	return contents.length - revealed.length;
};
