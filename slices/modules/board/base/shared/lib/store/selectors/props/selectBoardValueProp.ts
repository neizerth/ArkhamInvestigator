import type {
	BoardId,
	InvestigatorBoardValueProp,
	OmitBoard,
} from "@modules/board/base/shared/model";
import type { InvestigatorNumericStat, RootState } from "@shared/model";
import { selectBoardById } from "../find/selectBoardById";

export type SelectBoardPropValueOptions = {
	boardId: BoardId;
	type: InvestigatorBoardValueProp;
	prop: InvestigatorNumericStat;
};

export const selectBoardValueProp =
	({ boardId, prop, type }: SelectBoardPropValueOptions) =>
	(state: RootState) => {
		const board = selectBoardById(boardId)(state);
		return board[type][prop];
	};

export type SelectCurrentBoardPropValueOptions =
	OmitBoard<SelectBoardPropValueOptions>;

export const selectCurrentBoardValueProp = (
	options: SelectCurrentBoardPropValueOptions,
) =>
	selectBoardValueProp({
		...options,
		boardId: "current",
	});
