import type { ChaosBagReducer } from "@modules/chaos-bag/base/shared/model";
import {
	type HandleAddRevealedTokensPayload,
	handleAddRevealedTokens,
} from "../handlers";

export const addRevealedTokens: ChaosBagReducer<
	HandleAddRevealedTokensPayload
> = (state, { payload }) => {
	handleAddRevealedTokens(state, payload);
};
