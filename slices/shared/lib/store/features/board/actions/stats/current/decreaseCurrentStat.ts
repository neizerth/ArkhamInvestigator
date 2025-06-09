import type { ActionCreator } from "@reduxjs/toolkit";
import type { AppThunk, InvestigatorBoardNumericStat } from "@shared/model";
import {
	type ReduceCurrentStatOptions,
	reduceCurrentStat,
} from "./reduceCurrentStat";

export const decreaseCurrentStat: ActionCreator<AppThunk> =
	(
		type: InvestigatorBoardNumericStat,
		minValue = 0,
		options?: ReduceCurrentStatOptions,
	) =>
	(dispatch) => {
		dispatch(
			reduceCurrentStat({
				type,
				reducer: (value: number) => Math.max(value - 1, minValue),
				options,
			}),
		);
	};
