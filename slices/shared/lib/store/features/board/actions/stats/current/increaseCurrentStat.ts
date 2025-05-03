import type { AppThunk } from "@shared/model";
import type { InvestigatorBoardStat } from "@shared/model";
import {
	type ReduceCurrentStatOptions,
	reduceCurrentStat,
} from "./reduceCurrentStat";

export const increaseCurrentStat =
	(
		type: InvestigatorBoardStat,
		maxValue = Number.POSITIVE_INFINITY,
		options?: ReduceCurrentStatOptions,
	): AppThunk =>
	(dispatch) => {
		dispatch(
			reduceCurrentStat({
				type,
				reducer: (value: number) => Math.min(value + 1, maxValue),
				options,
			}),
		);
	};
