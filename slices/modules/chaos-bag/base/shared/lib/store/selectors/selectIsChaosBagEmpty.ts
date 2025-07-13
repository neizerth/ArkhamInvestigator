import { createSelector } from "@reduxjs/toolkit";
import { selectChaosBagContents } from "../chaosBag";

export const selectIsChaosBagEmpty = createSelector(
	[selectChaosBagContents],
	({ length }) => length === 0,
);
