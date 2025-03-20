import { createSelector } from "@reduxjs/toolkit";
import { propEq } from "ramda";
import { selectSelectedInvestigators } from "../game";
import { selectReplaceCode } from "./selectReplaceCode";

export const selectFocusedInvestigators = createSelector(
	[selectSelectedInvestigators, selectReplaceCode],
	(selected, replaceCode) => {
		if (!replaceCode) {
			return selected;
		}

		return selected;
	},
);
