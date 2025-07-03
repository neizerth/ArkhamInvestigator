import { selectChaosTokenCount } from "@modules/chaos-bag/base/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { canAddRevealHistoryItem } from "../../../logic";

export const selectCanAddRevealHistoryItem = createSelector(
	[selectChaosTokenCount],
	(chaosTokenCount) =>
		canAddRevealHistoryItem({
			chaosTokenCount,
		}),
);
