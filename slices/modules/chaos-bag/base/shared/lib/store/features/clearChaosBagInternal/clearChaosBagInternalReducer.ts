import type { ChaosBagReducer } from "@modules/chaos-bag/base/shared/model";
import {
	type HandleClearChaosBagInternalPayload,
	handleClearChaosBagInternal,
} from "./handleClearChaosBagInternal";

export const clearChaosBagInternalReducer: ChaosBagReducer<
	HandleClearChaosBagInternalPayload
> = (state, { payload }) => {
	handleClearChaosBagInternal(state, payload);
};
