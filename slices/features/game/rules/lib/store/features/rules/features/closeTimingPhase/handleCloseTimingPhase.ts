import { equals, reject } from "ramda";
import type { RulesHandler } from "../../../../../../model";

export const handleCloseTimingPhase: RulesHandler<number> = (state, id) => {
	const openPhases = state.openTimingPhases || [];

	state.openTimingPhases = reject(equals(id), openPhases);
};
