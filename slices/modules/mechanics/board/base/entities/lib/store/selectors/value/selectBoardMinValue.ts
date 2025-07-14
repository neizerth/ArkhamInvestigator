import { selectAllowNegativeHealthAndSanity } from "@modules/board/base/shared/lib/store";
import {
	boardValuesLimit,
	maxRegularValue,
	minNegativeHealthAndSanityValue,
} from "@modules/mechanics/board/base/entities/config";
import type { InvestigatorNumericStat, RootState } from "@shared/model";

type Options = {
	prop: InvestigatorNumericStat;
};

export const selectBoardMinValue =
	({ prop }: Options) =>
	(state: RootState) => {
		const negative = selectAllowNegativeHealthAndSanity(state);
		if (negative && (prop === "health" || prop === "sanity")) {
			return minNegativeHealthAndSanityValue;
		}
		return boardValuesLimit.min[prop] ?? maxRegularValue;
	};
