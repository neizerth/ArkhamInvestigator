import type { ChaosBagRevealReducer } from "../../../../model";
import {
	type HandleStartChaosBagRevealInternalPayload,
	handleStartChaosBagRevealInternal,
} from "./handleStartChaosBagRevealInternal";

export type { HandleStartChaosBagRevealInternalPayload as StartChaosBagRevealInternalPayload } from "./handleStartChaosBagRevealInternal";

export const startChaosBagRevealInternal: ChaosBagRevealReducer<
	HandleStartChaosBagRevealInternalPayload
> = (state, { payload }) => {
	handleStartChaosBagRevealInternal(state, payload);
};
