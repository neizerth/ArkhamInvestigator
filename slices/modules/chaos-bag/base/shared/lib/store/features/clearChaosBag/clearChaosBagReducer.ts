import type { ChaosBagReducer } from "@modules/chaos-bag/base/shared/model";
import { handleClearChaosBag } from "./handleClearChaosBag";

export const clearChaosBagReducer: ChaosBagReducer = (state, { payload }) => {
	handleClearChaosBag(state, payload);
};
