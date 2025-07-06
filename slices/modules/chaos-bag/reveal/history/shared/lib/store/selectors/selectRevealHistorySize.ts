import { createSelector } from "@reduxjs/toolkit";
import { selectRevealHistory } from "../chaosBagRevealHistory";

export const selectRevealHistorySize = createSelector(
	[selectRevealHistory],
	({ length }) => length,
);
