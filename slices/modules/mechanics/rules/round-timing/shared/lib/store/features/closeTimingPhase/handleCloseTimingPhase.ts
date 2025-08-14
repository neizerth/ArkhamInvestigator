import { equals, reject } from "ramda";
import type { RoundTimingHandler } from "../../../../model";

export const handleCloseTimingPhase: RoundTimingHandler<number> = (
	state,
	id,
) => {
	const openPhases = state.openTimingPhases || [];

	state.openTimingPhases = reject(equals(id), openPhases);
};
