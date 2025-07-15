import type { ChaosBagRevealReducer } from "../../../../model";
import { handleEndChaosBagReveal } from "./handleEndChaosBagReveal";

export const endChaosBagRevealReducer: ChaosBagRevealReducer = (state) => {
	handleEndChaosBagReveal(state);
};
