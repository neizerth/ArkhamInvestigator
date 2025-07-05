import { selectRevealHistory } from "@modules/chaos-bag/base/shared/lib";
import { createSelector } from "@reduxjs/toolkit";

export const selectRevealHistorySize = createSelector(
	[selectRevealHistory],
	({ length }) => length,
);
