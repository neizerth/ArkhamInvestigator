import type { ChaosBagReducer } from "@modules/chaos-bag/base/shared/model";
import {
	type HandleUpdateChaosTokenInternalPayload,
	handleUpdateChaosTokenInternal,
} from "./handleUpdateChaosTokenInternal";

export const updateChaosTokenInternalReducer: ChaosBagReducer<
	HandleUpdateChaosTokenInternalPayload
> = (state, { payload }) => {
	handleUpdateChaosTokenInternal(state, payload);
};
