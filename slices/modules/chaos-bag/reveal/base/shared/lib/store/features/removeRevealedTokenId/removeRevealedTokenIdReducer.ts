import type { ChaosBagRevealReducer } from "../../../../model";
import {
	type HandleRemoveRevealedTokenIdPayload,
	handleRemoveRevealedTokenId,
} from "./handleRemoveRevealedTokenId";

export const removeRevealedTokenIdReducer: ChaosBagRevealReducer<
	HandleRemoveRevealedTokenIdPayload
> = (state, { payload }) => {
	handleRemoveRevealedTokenId(state, payload);
};
