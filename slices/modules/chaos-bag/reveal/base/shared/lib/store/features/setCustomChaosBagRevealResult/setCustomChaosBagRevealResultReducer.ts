import type { ChaosBagRevealReducer } from "@modules/chaos-bag/reveal/base/shared/model";
import {
	type SetCustomChaosBagRevealResultPayload,
	handleSetCustomChaosBagRevealResult,
} from "./handleSetCustomChaosBagRevealResult";

export const setCustomChaosBagRevealResultReducer: ChaosBagRevealReducer<
	SetCustomChaosBagRevealResultPayload
> = (state, { payload }) => {
	handleSetCustomChaosBagRevealResult(state, payload);
};
