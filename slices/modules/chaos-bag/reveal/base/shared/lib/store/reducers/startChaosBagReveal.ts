import type { ChaosBagRevealReducer } from "../../../model";
import {
	type HandleStartChaosBagRevealPayload,
	handleStartChaosBagReveal,
} from "../handlers";

export const startChaosBagReveal: ChaosBagRevealReducer<
	HandleStartChaosBagRevealPayload
> = (state, { payload }) => {
	handleStartChaosBagReveal(state, payload);
};
