import type { ActionCreator } from "@reduxjs/toolkit";
import type { AppThunk } from "@shared/model";
import type { InvestigatorBoardStat } from "@shared/model";
import { reduceCurrentStat } from "./reduceCurrentStat";

export const increaseCurrentStat: ActionCreator<AppThunk> =
	(type: InvestigatorBoardStat, maxValue = Number.POSITIVE_INFINITY) =>
	(dispatch) => {
		dispatch(
			reduceCurrentStat(type, (value: number) => Math.min(value + 1, maxValue)),
		);
	};
