import type { ChaosBagReducer } from "../../../model";
import {
	type HandleRemoveAllChaosTokensByTypeInternalPayload,
	handleRemoveAllChaosTokensByTypeInternal,
} from "../handlers";

export const removeAllChaosTokensByTypeInternal: ChaosBagReducer<
	HandleRemoveAllChaosTokensByTypeInternalPayload
> = (state, { payload }) => {
	handleRemoveAllChaosTokensByTypeInternal(state, payload);
};
