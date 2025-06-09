import type { ActionCreator } from "@reduxjs/toolkit";
import type { AppThunk, InvestigatorBoardNumericStat } from "@shared/model";
import { reduceBaseStat } from "./reduceBaseStat";

export const increaseBaseStat: ActionCreator<AppThunk> =
	(type: InvestigatorBoardNumericStat, maxValue = Number.POSITIVE_INFINITY) =>
	(dispatch) => {
		dispatch(
			reduceBaseStat(type, (value: number) => Math.min(value + 1, maxValue)),
		);
	};
