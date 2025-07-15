import type { ChaosBagRevealReducer } from "../../../../model";
import { handleRemoveRevealedTokenId } from "./handleRemoveRevealedTokenId";

export const removeRevealedTokenIdReducer: ChaosBagRevealReducer<string> = (
	state,
	{ payload },
) => {
	handleRemoveRevealedTokenId(state, payload);
};
