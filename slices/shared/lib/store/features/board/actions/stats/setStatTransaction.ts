import type { AppThunk } from "@shared/lib/store";
import type {
	InvestigatorBoardStat,
	InvestigatorBoardValues,
} from "@shared/model";
import { addCurrentHistoryItem } from "../history";
import { setBaseStat } from "./base";
import { setCurrentStat } from "./current";

const noHistory = {
	addToHistory: false,
};

export const setStatTransaction =
	<T extends InvestigatorBoardStat>(
		statType: T,
		value: InvestigatorBoardValues[T],
		baseValue: InvestigatorBoardValues[T],
	): AppThunk =>
	(dispatch) => {
		dispatch(setBaseStat(statType, baseValue, noHistory));
		dispatch(setCurrentStat(statType, value, noHistory));

		dispatch(
			addCurrentHistoryItem({
				value: {
					[statType]: value,
				},
				baseValue: {
					[statType]: baseValue,
				},
			}),
		);
	};
