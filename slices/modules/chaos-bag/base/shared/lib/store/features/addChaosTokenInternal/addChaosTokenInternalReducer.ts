import type { ChaosBagReducer } from "@modules/chaos-bag/base/shared/model";
import {
	type HandleAddChaosTokenInternalPayload,
	handleAddChaosTokenInternal,
} from "./handleAddChaosTokenInternal";

export const addChaosTokenInternalReducer: ChaosBagReducer<
	HandleAddChaosTokenInternalPayload
> = (state, { payload }) => {
	handleAddChaosTokenInternal(state, payload);
};
