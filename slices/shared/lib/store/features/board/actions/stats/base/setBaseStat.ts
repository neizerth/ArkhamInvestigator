import type { ActionCreator } from "@reduxjs/toolkit";
import type { AppThunk, InvestigatorBoardNumericStat } from "@shared/model";
import type { InvestigatorBoardValues } from "@shared/model";
import { always } from "ramda";
import { type ReduceBaseStatOptions, reduceBaseStat } from "./reduceBaseStat";

export const setBaseStat: ActionCreator<AppThunk> =
	<T extends InvestigatorBoardNumericStat>(
		type: T,
		value: InvestigatorBoardValues[T],
		options?: ReduceBaseStatOptions,
	) =>
	(dispatch) =>
		dispatch(reduceBaseStat(type, always(value), options));
