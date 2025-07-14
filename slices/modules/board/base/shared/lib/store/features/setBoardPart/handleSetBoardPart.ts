import type {
	BoardHandler,
	InvestigatorBoard,
} from "@modules/board/base/shared/model";
import { mergeDeepRight } from "ramda";
import { getBoardIndex } from "../../getters/props/getBoardIndex";
import type { SetBoardPartPayload } from "./setBoardPart";

export const handleSetBoardPart: BoardHandler<SetBoardPartPayload> = (
	state,
	{ boardId, data },
) => {
	const index = getBoardIndex({
		...state,
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
