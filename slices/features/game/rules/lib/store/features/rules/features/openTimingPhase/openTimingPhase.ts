import type { RulesReducer } from "../../../../../../model";
import { handleOpenTimingPhase } from "./handleOpenTimingPhase";

export const openTimingPhase: RulesReducer<number> = (state, { payload }) => {
	handleOpenTimingPhase(state, payload);
};
