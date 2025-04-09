import type { ActionCreator } from "@reduxjs/toolkit";
import type { AppThunk } from "@shared/model";
import type { InvestigatorBoardStat } from "@shared/model";
import { reduceBaseStat } from "./reduceBaseStat";

export const increaseBaseStat: ActionCreator<AppThunk> =
	(type: InvestigatorBoardStat, maxValue = Number.POSITIVE_INFINITY) =>
	(dispatch) => {
		dispatch(
			reduceBaseStat(type, (value: number) => Math.min(value + 1, maxValue)),
		);
	};
