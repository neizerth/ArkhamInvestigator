import type {
	BoardDraft,
	InvestigatorBoardStat,
} from "@modules/board/base/shared/model";
import type { ChangeBoardPropValuePayload } from "../../actions";
import { getBoardById } from "../../getters/find";

export type HandleSetBoardPropValueOptions<K extends InvestigatorBoardStat> =
	ChangeBoardPropValuePayload<K> & {
		state: BoardDraft;
	};

export const handleSetBoardPropValue = <K extends InvestigatorBoardStat>({
	state,
	boardId,
	prop,
	value,
	type,
}: HandleSetBoardPropValueOptions<K>) => {
	const board = getBoardById({
		state,
		boardId,
	});

	if (!board) {
		return;
	}
	board[type][prop] = value;
};
