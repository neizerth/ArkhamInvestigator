import type { ChaosBagReducer } from "../../../model";
import {
	type HandleUpdateChaosTokenInternalPayload,
	handleUpdateChaosTokenInternal,
} from "../handlers";

export const updateChaosTokenInternal: ChaosBagReducer<
	HandleUpdateChaosTokenInternalPayload
> = (state, { payload }) => {
	handleUpdateChaosTokenInternal(state, payload);
};
