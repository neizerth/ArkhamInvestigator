import type { ChaosBagRevealReducer } from "../../../../model";
import {
	type HandleAddRevealedTokensPayload,
	handleAddRevealedTokens,
} from "./handleAddRevealedTokens";

export const addRevealedTokensReducer: ChaosBagRevealReducer<
	HandleAddRevealedTokensPayload
> = (state, { payload }) => {
	handleAddRevealedTokens(state, payload);
};
