import { createSelector } from "@reduxjs/toolkit";
import { selectCurrentBoardAbilities } from "./selectCurrentBoardAbilities";
import { selectHaveAdditionalAction } from "./selectHaveAdditionalAction";

export const selectHaveBoardAbilities = createSelector(
	[selectHaveAdditionalAction, selectCurrentBoardAbilities],
	(additionalAction, abilities) => additionalAction || abilities.length > 0,
);
