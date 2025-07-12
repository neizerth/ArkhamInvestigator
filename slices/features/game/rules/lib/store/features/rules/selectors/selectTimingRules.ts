import { createSelector } from "@reduxjs/toolkit";
import { getTimingRules } from "../getters";
import { selectRules } from "../rules";

export const selectTimingRules = createSelector([selectRules], (rules = []) => {
	return getTimingRules({ rules });
});
