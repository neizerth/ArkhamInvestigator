import type { ChaosBagReducer } from "@modules/chaos-bag/base/shared/model";
import { handleRemoveRevealedTokenId } from "../handlers";

export const removeRevealedTokenId: ChaosBagReducer<string> = (
	state,
	{ payload },
) => {
	handleRemoveRevealedTokenId(state, payload);
};
