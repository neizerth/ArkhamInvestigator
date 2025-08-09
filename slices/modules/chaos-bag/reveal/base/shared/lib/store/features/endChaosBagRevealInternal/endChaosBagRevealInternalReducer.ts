import type { ChaosBagRevealReducer } from "../../../../model";
import { handleEndChaosBagRevealInternal } from "./handleEndChaosBagRevealInternal";

export const endChaosBagRevealInternalReducer: ChaosBagRevealReducer = (
	state,
) => {
	handleEndChaosBagRevealInternal(state);
};
