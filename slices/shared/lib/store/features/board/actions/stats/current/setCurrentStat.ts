import type { AppThunk } from "@shared/model";
import type { InvestigatorBoardValues } from "@shared/model";
import { always } from "ramda";
import {
	type ReduceCurrentStatOptions,
	reduceCurrentStat,
} from "./reduceCurrentStat";

export const setCurrentStat =
	<T extends keyof InvestigatorBoardValues>(
		type: T,
		value: InvestigatorBoardValues[T],
		options?: ReduceCurrentStatOptions,
	): AppThunk =>
	(dispatch) =>
		dispatch(
			reduceCurrentStat({
				type,
				reducer: always(value),
				options,
			}),
		);
