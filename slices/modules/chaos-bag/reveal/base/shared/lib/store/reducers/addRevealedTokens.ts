import type { ChaosBagRevealReducer } from "../../../model";
import {
	type HandleAddRevealedTokensPayload,
	handleAddRevealedTokens,
} from "../handlers";

export const addRevealedTokens: ChaosBagRevealReducer<
	HandleAddRevealedTokensPayload
> = (state, { payload }) => {
	handleAddRevealedTokens(state, payload);
};
