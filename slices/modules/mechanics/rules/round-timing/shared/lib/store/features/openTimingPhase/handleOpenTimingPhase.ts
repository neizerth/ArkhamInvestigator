import type { RoundTimingHandler } from "../../../../model";

export const handleOpenTimingPhase: RoundTimingHandler<number> = (
	state,
	id,
) => {
	const openPhases = state.openTimingPhases || [];

	state.openTimingPhases = [...openPhases, id];
};
