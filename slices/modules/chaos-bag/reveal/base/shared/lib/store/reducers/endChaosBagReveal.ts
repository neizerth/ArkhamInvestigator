import type { ChaosBagRevealReducer } from "../../../model";
import { handleEndChaosBagReveal } from "../handlers";

export const endChaosBagReveal: ChaosBagRevealReducer = (state) => {
	handleEndChaosBagReveal(state);
};
