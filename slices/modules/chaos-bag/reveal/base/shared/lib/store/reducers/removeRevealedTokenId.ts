import type { ChaosBagRevealReducer } from "../../../model";
import { handleRemoveRevealedTokenId } from "../handlers";

export const removeRevealedTokenId: ChaosBagRevealReducer<string> = (
	state,
	{ payload },
) => {
	handleRemoveRevealedTokenId(state, payload);
};
