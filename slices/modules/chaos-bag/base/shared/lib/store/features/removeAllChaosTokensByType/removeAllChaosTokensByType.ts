import type { ChaosBagReducer } from "@modules/chaos-bag/base/shared/model";
import {
	type HandleRemoveAllChaosTokensByTypePayload,
	handleRemoveAllChaosTokensByType,
} from "./handleRemoveAllChaosTokensByType";

export const removeAllChaosTokensByType: ChaosBagReducer<
	HandleRemoveAllChaosTokensByTypePayload
> = (state, { payload }) => {
	handleRemoveAllChaosTokensByType(state, payload);
};
