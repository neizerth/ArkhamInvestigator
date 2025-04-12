import { createSelector } from "@reduxjs/toolkit";
import { selectBoardAbilities } from "./selectBoardAbilities";
import { selectHaveAdditionalAction } from "./selectHaveAdditionalAction";

export const selectHaveBoardAbilities = createSelector(
	[selectHaveAdditionalAction, selectBoardAbilities],
	(additionalAction, abilities) => additionalAction || abilities.length > 0,
);
