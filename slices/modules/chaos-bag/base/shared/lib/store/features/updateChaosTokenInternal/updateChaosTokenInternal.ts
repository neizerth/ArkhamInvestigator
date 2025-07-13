import type { ChaosBagReducer } from "@modules/chaos-bag/base/shared/model";
import {
	type HandleUpdateChaosTokenInternalPayload,
	handleUpdateChaosTokenInternal,
} from "./handleUpdateChaosTokenInternal";

export const updateChaosTokenInternal: ChaosBagReducer<
	HandleUpdateChaosTokenInternalPayload
> = (state, { payload }) => {
	handleUpdateChaosTokenInternal(state, payload);
};
