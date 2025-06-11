import type {
	BoardReducer,
	InvestigatorBoard,
} from "@modules/board/base/shared/model";
import { always } from "ramda";
import { handleReduceBoard } from "../../../handlers";

export const setCurrentBoard: BoardReducer<InvestigatorBoard> = (
	state,
	{ payload },
) => {
	handleReduceBoard({
		state,
		boardId: "current",
		reducer: always(payload),
	});
};
