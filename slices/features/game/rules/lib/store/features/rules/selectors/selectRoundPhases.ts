import type { RootState } from "@shared/model";
import { getRoundPhases } from "../../../../logic";
import { selectTimingRules } from "./selectTimingRules";

export const selectRoundPhases = (state: RootState) => {
	const rules = selectTimingRules(state);
	return getRoundPhases(rules);
};
