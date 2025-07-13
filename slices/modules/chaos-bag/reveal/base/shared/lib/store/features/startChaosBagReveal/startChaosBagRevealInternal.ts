import type { ChaosBagRevealReducer } from "../../../../model";
import {
	type HandleStartChaosBagRevealPayload,
	handleStartChaosBagRevealInternal,
} from "./handleStartChaosBagRevealInternal";

export const startChaosBagRevealInternal: ChaosBagRevealReducer<
	HandleStartChaosBagRevealPayload
> = (state, { payload }) => {
	handleStartChaosBagRevealInternal(state, payload);
};
