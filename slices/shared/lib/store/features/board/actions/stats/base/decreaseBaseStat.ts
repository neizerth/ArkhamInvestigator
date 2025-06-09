import type { AppThunk, InvestigatorBoardNumericStat } from "@shared/model";
import { selectCurrentBoard } from "../../../selectors/current/selectCurrentBoard";
import { reduceBaseStat } from "./reduceBaseStat";

const minValues = {
	resources: 0,
	actions: 0,
	clues: 0,
};

export const decreaseBaseStat =
	(type: InvestigatorBoardNumericStat): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const { initialValue } = selectCurrentBoard(state);

		const values = {
			...initialValue,
			...minValues,
		};
		const minValue = values[type];

		const reducer = (value: number) => Math.max(value - 1, minValue);
		dispatch(reduceBaseStat(type, reducer));
	};
