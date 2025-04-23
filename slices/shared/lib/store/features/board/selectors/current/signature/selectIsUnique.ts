import { createSelector } from "@reduxjs/toolkit";
import { selectCurrentBoardProp } from "../props";

export const selectIsUnique = createSelector(
	[selectCurrentBoardProp("investigator")],
	(board) => !board?.multiselect,
);
