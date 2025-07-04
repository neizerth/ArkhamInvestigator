import { createSelector } from "@reduxjs/toolkit";
import { selectReferenceCardTokens } from "@shared/lib";
import { getReferenceCardTokenValues } from "../../logic";

export const selectCurrentReferenceCardTokenValues = createSelector(
	[selectReferenceCardTokens],
	getReferenceCardTokenValues,
);
