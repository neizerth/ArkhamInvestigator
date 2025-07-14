import type { RootState } from "@shared/model";
import { selectRevealedTokens } from "./selectRevealedTokens";

export const selectRevealedTokensCount = (state: RootState) => {
	const tokens = selectRevealedTokens(state);
	return tokens.length || 0;
};
