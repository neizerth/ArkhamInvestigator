import type { ActionCreator } from "@reduxjs/toolkit";
import type { AppThunk } from "@shared/lib/store";
import type { InvestigatorBoardValues } from "@shared/model";
import { always } from "ramda";
import {
	type ReduceCurrentStatOptions,
	reduceCurrentStat,
} from "./reduceCurrentStat";

export const setCurrentStat: ActionCreator<AppThunk> =
	<T extends keyof InvestigatorBoardValues>(
		type: T,
		value: InvestigatorBoardValues[T],
		options?: ReduceCurrentStatOptions,
	) =>
	(dispatch) =>
		dispatch(reduceCurrentStat(type, always(value), options));
