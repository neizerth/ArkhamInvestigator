import type {
	BoardId,
	BoardReducer,
	InvestigatorBoard,
} from "@modules/board/base/shared/model";
import { always } from "ramda";
import { handleReduceBoard } from "../../handlers";

export type SetBoardPayload = {
	boardId: BoardId;
	data: InvestigatorBoard;
};

export const setBoard: BoardReducer<SetBoardPayload> = (state, { payload }) => {
	const { data } = payload;

	handleReduceBoard({
		...payload,
		state,
		reducer: always(data),
	});
};
