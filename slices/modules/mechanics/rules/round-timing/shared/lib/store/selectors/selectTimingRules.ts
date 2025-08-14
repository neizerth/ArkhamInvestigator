import { selectRules } from "@modules/mechanics/rules/base/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { getTimingRules } from "../getters";

export const selectTimingRules = createSelector([selectRules], (rules = []) => {
	return getTimingRules({ rules });
});
