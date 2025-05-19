import type { ActionCreator } from "@reduxjs/toolkit";
import type { AppThunk } from "@shared/model";
import type { InvestigatorBoardStat } from "@shared/model";
import {
	type ReduceCurrentStatOptions,
	reduceCurrentStat,
} from "./reduceCurrentStat";

export const decreaseCurrentStat: ActionCreator<AppThunk> =
	(
		type: InvestigatorBoardStat,
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
