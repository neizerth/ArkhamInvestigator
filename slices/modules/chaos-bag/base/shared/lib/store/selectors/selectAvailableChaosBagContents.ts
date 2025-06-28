import { createSelector } from "@reduxjs/toolkit";
import { selectChaosBagContents } from "../chaosBag";

export const selectAvailableChaosBagContents = createSelector(
	[selectChaosBagContents],
	(contents) => contents.filter(({ sealed }) => !sealed),
);
