import { createSelector } from "@reduxjs/toolkit";
import { selectCurrentStatValue } from "../values";

export const selectCurrentIsDefeated = createSelector(
	[selectCurrentStatValue("health"), selectCurrentStatValue("sanity")],
	(health, sanity) => health <= 0 || sanity <= 0,
);
