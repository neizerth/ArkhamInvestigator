import { createSelector } from "@reduxjs/toolkit";
import { selectReferenceCardTokenValues } from "@shared/lib";
import { getDefaultReferenceTokenValues } from "../../../../../reference/getDefaultReferenceTokenValues";

export const selectReferenceDefaultTokenValues = createSelector(
	[selectReferenceCardTokenValues],
	(data) => {
		return getDefaultReferenceTokenValues(data);
	},
);
