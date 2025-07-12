import type { RulesHandler } from "../../../../../../model";

export const handleOpenTimingPhase: RulesHandler<number> = (state, id) => {
	const openPhases = state.openTimingPhases || [];

	state.openTimingPhases = [...openPhases, id];
};
