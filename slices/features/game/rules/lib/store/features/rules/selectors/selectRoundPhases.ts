import { createSelector } from "@reduxjs/toolkit";
import { getRoundPhases } from "../../../../logic";
import { selectTimingRules } from "./selectTimingRules";

export const selectRoundPhases = createSelector(
	[selectTimingRules],
	(rules) => {
		return getRoundPhases(rules);
	},
);
