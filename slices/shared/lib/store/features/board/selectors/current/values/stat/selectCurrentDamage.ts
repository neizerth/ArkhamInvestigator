import { createSelector } from "@reduxjs/toolkit";
import { selectCurrentStatBaseValue } from "../selectCurrentStatBaseValue";
import { selectCurrentStatValue } from "../selectCurrentStatValue";

export const selectCurrentDamage = createSelector(
	[selectCurrentStatBaseValue("health"), selectCurrentStatValue("health")],
	(baseValue, value) => Math.max(0, baseValue - value),
);
