import { createSelector } from "@reduxjs/toolkit";
import { selectCurrentBoardProp } from "../props";

export const selectIsParallel = createSelector(
	[selectCurrentBoardProp("investigator")],
	({ type }) => type === "parallel",
);
