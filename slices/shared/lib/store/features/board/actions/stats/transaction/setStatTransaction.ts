import type { AppThunk } from "@shared/model";
import type {
	InvestigatorBoardNumericStat,
	InvestigatorBoardValues,
} from "@shared/model";
import { addCurrentHistoryItem } from "../../history";
import { setBaseStat } from "../base";
import { setCurrentStat } from "../current";
import { setInitialStat } from "../initial";

const noHistory = {
	addToHistory: false,
};

type Options<T extends InvestigatorBoardNumericStat> = {
	statType: T;
	value: InvestigatorBoardValues[T];
	baseValue: InvestigatorBoardValues[T];
	initialValue?: InvestigatorBoardValues[T];
};

export const setStatTransaction =
	<T extends InvestigatorBoardNumericStat>({
		statType,
		value,
		baseValue,
		initialValue,
	}: Options<T>): AppThunk =>
	(dispatch) => {
		dispatch(setBaseStat(statType, baseValue, noHistory));
		dispatch(setCurrentStat(statType, value, noHistory));

		let initialData = {};

		if (typeof initialValue === "number") {
			dispatch(
				setInitialStat({
					statType,
					value: initialValue,
				}),
			);
			initialData = {
				[statType]: initialValue,
			};
		}
		dispatch(
			addCurrentHistoryItem({
				value: {
					[statType]: value,
				},
				baseValue: {
					[statType]: baseValue,
				},
				...initialData,
			}),
		);
	};
