import type {
	BoardDraft,
	InvestigatorBoard,
} from "@modules/board/base/shared/model";
import { mergeDeepRight } from "ramda";
import type { ChangeBoardPartPayload } from "../../actions";
import { getBoardIndex } from "../../getters/props/getBoardIndex";

export type HandleSetBoardPartOptions = ChangeBoardPartPayload & {
	state: BoardDraft;
};

export const handleSetBoardPart = ({
	state,
	boardId,
	data,
}: HandleSetBoardPartOptions) => {
	const index = getBoardIndex({
		state,
		boardId,
	});

	if (typeof index !== "number") {
		return;
	}
	const board = state.investigatorBoards[index];
	state.investigatorBoards[index] = mergeDeepRight(
		board,
		data,
	) as InvestigatorBoard;
};
