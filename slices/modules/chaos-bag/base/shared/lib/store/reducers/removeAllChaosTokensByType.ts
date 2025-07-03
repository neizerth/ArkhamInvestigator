import type { ChaosBagReducer } from "../../../model";
import {
	type HandleRemoveAllChaosTokensByTypePayload,
	handleRemoveAllChaosTokensByType,
} from "../handlers";

export const removeAllChaosTokensByType: ChaosBagReducer<
	HandleRemoveAllChaosTokensByTypePayload
> = (state, { payload }) => {
	handleRemoveAllChaosTokensByType(state, payload);
};
