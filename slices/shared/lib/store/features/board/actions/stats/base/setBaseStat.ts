import type { ActionCreator } from "@reduxjs/toolkit";
import {
	type AppThunk,
	selectCurrentBoard,
	setCurrentBoard,
} from "@shared/lib/store";
import type {
	InvestigatorBoardStat,
	InvestigatorBoardValues,
} from "@shared/model";
import { always } from "ramda";
import { reduceBaseStat } from "./reduceBaseStat";

export const setBaseStat: ActionCreator<AppThunk> =
	<T extends keyof InvestigatorBoardValues>(
		type: T,
		value: InvestigatorBoardValues[T],
	) =>
	(dispatch) =>
		dispatch(reduceBaseStat(type, always(value)));
