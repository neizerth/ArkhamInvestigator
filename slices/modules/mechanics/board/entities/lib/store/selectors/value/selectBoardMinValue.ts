import { selectAllowNegativeHealthAndSanity } from "@modules/board/base/shared/lib";
import {
	boardValuesLimit,
	maxRegularValue,
	minNegativeHealthAndSanityValue,
} from "@modules/mechanics/board/shared/config";
import { createSelector } from "@reduxjs/toolkit";
import type { InvestigatorNumericStat } from "@shared/model";

type Options = {
	prop: InvestigatorNumericStat;
};

export const selectBoardMinValue = ({ prop }: Options) =>
	createSelector([selectAllowNegativeHealthAndSanity], (negative) => {
		if (negative && (prop === "health" || prop === "sanity")) {
			return minNegativeHealthAndSanityValue;
		}
		return boardValuesLimit.min[prop] ?? maxRegularValue;
	});
