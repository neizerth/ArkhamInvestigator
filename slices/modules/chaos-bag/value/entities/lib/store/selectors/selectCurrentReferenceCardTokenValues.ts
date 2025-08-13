import { selectReferenceCardTokens } from "@modules/stories/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { getReferenceCardTokenValues } from "../../logic";

export const selectCurrentReferenceCardTokenValues = createSelector(
	[selectReferenceCardTokens],
	getReferenceCardTokenValues,
);
