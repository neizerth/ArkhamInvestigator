import type { ChaosBagRevealReducer } from "@modules/chaos-bag/reveal/base/shared/model";
import {
	type HandleSyncRevealedTokensWithContentsPayload,
	handleSyncRevealedTokensWithContents,
} from "./handleSyncRevealedTokensWithContents";

export const syncRevealedValuesWithContentsReducer: ChaosBagRevealReducer<
	HandleSyncRevealedTokensWithContentsPayload
> = (state, { payload }) => {
	handleSyncRevealedTokensWithContents(state, payload);
};
