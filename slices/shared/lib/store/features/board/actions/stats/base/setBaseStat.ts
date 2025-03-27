import type { ActionCreator } from "@reduxjs/toolkit";
import type { AppThunk } from "@shared/lib/store";
import type { InvestigatorBoardValues } from "@shared/model";
import { always } from "ramda";
import { type ReduceBaseStatOptions, reduceBaseStat } from "./reduceBaseStat";

export const setBaseStat: ActionCreator<AppThunk> =
	<T extends keyof InvestigatorBoardValues>(
		type: T,
		value: InvestigatorBoardValues[T],
		options?: ReduceBaseStatOptions,
	) =>
	(dispatch) =>
		dispatch(reduceBaseStat(type, always(value), options));
