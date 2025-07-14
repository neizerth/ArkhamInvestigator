import type { RootState } from "@shared/model";
import { last } from "ramda";
import { selectRevealedTokens } from "./selectRevealedTokens";

export const selectLastRevealedToken = (state: RootState) => {
	const tokens = selectRevealedTokens(state);
	return last(tokens);
};
