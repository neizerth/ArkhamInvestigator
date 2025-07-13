import type { ChaosBagRevealReducer } from "../../../../model";
import { handleRemoveRevealedTokenId } from "./handleRemoveRevealedTokenId";

export const removeRevealedTokenId: ChaosBagRevealReducer<string> = (
	state,
	{ payload },
) => {
	handleRemoveRevealedTokenId(state, payload);
};
