import { createSelector } from "@reduxjs/toolkit";
import { selectFactionFilter } from "@shared/lib";

export const selectCurrentFactionFilter = createSelector(
	[selectFactionFilter],
	(faction) => faction || "guardian",
);
