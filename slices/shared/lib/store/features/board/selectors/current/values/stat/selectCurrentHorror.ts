import { createSelector } from "@reduxjs/toolkit";

import { selectCurrentStatBaseValue } from "../selectCurrentStatBaseValue";
import { selectCurrentStatValue } from "../selectCurrentStatValue";

export const selectCurrentHorror = createSelector(
	[selectCurrentStatBaseValue("sanity"), selectCurrentStatValue("sanity")],
	(baseValue, value) => Math.max(0, baseValue - value),
);
