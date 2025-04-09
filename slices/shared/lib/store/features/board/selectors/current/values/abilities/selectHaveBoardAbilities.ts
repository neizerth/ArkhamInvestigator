import { createSelector } from "@reduxjs/toolkit";
import { selectCurrentStatBaseValue } from "../selectCurrentStatBaseValue";
import { selectBoardAbilities } from "./selectBoardAbilities";

export const selectHaveBoardAbilities = createSelector(
	[selectCurrentStatBaseValue("additionalAction"), selectBoardAbilities],
	(additionalAction, abilities) => additionalAction || abilities.length > 0,
);
