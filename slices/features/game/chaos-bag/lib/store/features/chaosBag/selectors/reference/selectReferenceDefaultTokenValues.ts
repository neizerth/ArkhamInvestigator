import { createSelector } from "@reduxjs/toolkit";
import { selectReferenceCardTokens } from "@shared/lib";
import { getDefaultReferenceTokenValues } from "../../../../../reference/getDefaultReferenceTokenValues";

export const selectReferenceDefaultTokenValues = createSelector(
	[selectReferenceCardTokens],
	(data) => {
		return getDefaultReferenceTokenValues(data);
	},
);
