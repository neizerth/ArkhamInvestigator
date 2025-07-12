import type { RulesReducer } from "../../../../../../model";
import { handleCloseTimingPhase } from "./handleCloseTimingPhase";

export const closeTimingPhase: RulesReducer<number> = (state, { payload }) => {
	handleCloseTimingPhase(state, payload);
};
