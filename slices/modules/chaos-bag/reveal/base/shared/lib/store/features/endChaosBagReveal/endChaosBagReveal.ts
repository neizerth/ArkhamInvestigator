import type { ChaosBagRevealReducer } from "../../../../model";
import { handleEndChaosBagReveal } from "./handleEndChaosBagReveal";

export const endChaosBagReveal: ChaosBagRevealReducer = (state) => {
	handleEndChaosBagReveal(state);
};
