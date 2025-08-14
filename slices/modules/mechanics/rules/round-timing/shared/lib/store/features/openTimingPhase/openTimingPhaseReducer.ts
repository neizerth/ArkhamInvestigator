import type { RoundTimingReducer } from "../../../../model";
import { handleOpenTimingPhase } from "./handleOpenTimingPhase";

export const openTimingPhaseReducer: RoundTimingReducer<number> = (
	state,
	{ payload },
) => {
	handleOpenTimingPhase(state, payload);
};
