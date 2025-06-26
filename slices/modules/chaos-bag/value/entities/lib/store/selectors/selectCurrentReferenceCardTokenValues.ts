import { createSelector } from "@reduxjs/toolkit";
import { selectReferenceCardTokens } from "@shared/lib";
import { getReferenceCardTokenValues } from "../../getReferenceCardTokenValues";

export const selectCurrentReferenceCardTokenValues = createSelector(
	[selectReferenceCardTokens],
	getReferenceCardTokenValues,
);
