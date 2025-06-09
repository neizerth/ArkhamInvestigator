import type {
	AppThunk,
	InvestigatorBoardStat,
	InvestigatorBoardValues,
} from "@shared/model";
import { dec, inc } from "ramda";
import { InvesigatorCode } from "../../../../../../../config";
import { selectBoardByCode } from "../../../selectors";
import { reduceCurrentStat } from "../current";

type Options<T extends InvestigatorBoardStat> = {
	code: string;
	type: T;
	value: InvestigatorBoardValues[T];
	prevValue: InvestigatorBoardValues[T];
};

export const setStatChangeEffect =
	<T extends InvestigatorBoardStat>(options: Options<T>): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const board = selectBoardByCode(options.code)(state);
		if (!board) {
			return;
		}

		// Calwin Wright
		if (options.code === InvesigatorCode.CalvinWright) {
			const reducer = options.value > options.prevValue ? dec : inc;
			if (options.type === "health") {
				dispatch(
					reduceCurrentStat({
						type: "combat",
						reducer,
					}),
				);
				dispatch(
					reduceCurrentStat({
						type: "agility",
						reducer,
					}),
				);
				return;
			}
			if (options.type === "sanity") {
				dispatch(
					reduceCurrentStat({
						type: "willpower",
						reducer,
					}),
				);
				dispatch(
					reduceCurrentStat({
						type: "intellect",
						reducer,
					}),
				);
				return;
			}
		}
	};
