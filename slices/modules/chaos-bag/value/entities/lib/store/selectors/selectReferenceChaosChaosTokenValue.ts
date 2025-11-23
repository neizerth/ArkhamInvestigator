import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { selectCurrentReferenceCardTokenValues } from "./selectCurrentReferenceCardTokenValues";

export const selectReferenceChaosChaosTokenValue = (type: ChaosTokenType) =>
	createSelector([selectCurrentReferenceCardTokenValues], (values) => {
		return values[type] ?? 0;
	});
