import type { ChaosBagReducer } from "@modules/chaos-bag/base/shared/model";
import { handleClearChaosBagInternal } from "./handleClearChaosBagInternal";

export const clearChaosBagInternalReducer: ChaosBagReducer = (
	state,
	{ payload },
) => {
	handleClearChaosBagInternal(state, payload);
};
