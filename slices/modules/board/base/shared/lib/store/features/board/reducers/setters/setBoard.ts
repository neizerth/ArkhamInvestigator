import type {
	BoardId,
	BoardReducer,
	InvestigatorBoard,
} from "@modules/board/base/shared/model";
import { handleSetBoard } from "../../handlers";

export type SetBoardPayload = {
	boardId: BoardId;
	data: InvestigatorBoard;
};

export const setBoard: BoardReducer<SetBoardPayload> = (state, { payload }) => {
	const { boardId, data } = payload;

	handleSetBoard({
		state,
		boardId,
		data,
	});
};
