import type { AppThunk } from "@shared/model";
import { selectRevealedTokens } from "../../../selectors";
import { returnChaosToken } from "./returnChaosToken";
export const returnChaosTokens = (): AppThunk => (dispatch, getState) => {
	const state = getState();
	const tokens = selectRevealedTokens(state);

	for (const token of tokens) {
		dispatch(returnChaosToken(token));
	}
};
