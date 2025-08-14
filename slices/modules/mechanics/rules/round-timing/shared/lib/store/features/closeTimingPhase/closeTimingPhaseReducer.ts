import type { RoundTimingReducer } from "../../../../model";
import { handleCloseTimingPhase } from "./handleCloseTimingPhase";

export const closeTimingPhaseReducer: RoundTimingReducer<number> = (
	state,
	{ payload },
) => {
	handleCloseTimingPhase(state, payload);
};
