import { createSelector } from "@reduxjs/toolkit";
import { last } from "ramda";
import { selectRevealHistory } from "../chaosBagRevealHistory";

export const selectLastRevealHistory = createSelector(
	[selectRevealHistory],
	(history) => last(history),
);
