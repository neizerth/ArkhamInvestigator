import type { AppThunk, InvestigatorBoardNumericStat } from "@shared/model";
import {
	type ReduceCurrentStatOptions,
	reduceCurrentStat,
} from "./reduceCurrentStat";

export const increaseCurrentStat =
	(
		type: InvestigatorBoardNumericStat,
		maxValue = Number.POSITIVE_INFINITY,
		options?: ReduceCurrentStatOptions,
	): AppThunk =>
	(dispatch) => {
		dispatch(
			reduceCurrentStat({
				type,
				reducer: (value) => Math.min(value + 1, maxValue),
				options,
			}),
		);
	};
