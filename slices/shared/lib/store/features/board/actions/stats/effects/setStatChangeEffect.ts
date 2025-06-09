import type {
	AppThunk,
	BoardId,
	InvestigatorBoardStat,
	InvestigatorBoardValues,
} from "@shared/model";
import { InvesigatorCode } from "../../../../../../../config";
import { selectBoardByCode } from "../../../selectors";
import { setCalwinWrightEffects } from "./investigator";

export type SetStatChangeEffectOptions<T extends InvestigatorBoardStat> = {
	code: string;
	type: T;
	value: InvestigatorBoardValues[T];
	prevValue: InvestigatorBoardValues[T];
	boardId?: BoardId;
};

export const setStatChangeEffect =
	<T extends InvestigatorBoardStat>(
		options: SetStatChangeEffectOptions<T>,
	): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const board = selectBoardByCode(options.code)(state);
		if (!board) {
			return;
		}

		// Calwin Wright
		if (options.code === InvesigatorCode.CalvinWright) {
			dispatch(setCalwinWrightEffects(options));
			return;
		}
	};
