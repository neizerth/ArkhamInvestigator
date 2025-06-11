import type {
	BoardReducer,
	InvestigatorBoard,
} from "@modules/board/base/shared/model";
import { handleSetBoard } from "../../../handlers";

export const setCurrentBoard: BoardReducer<InvestigatorBoard> = (
	state,
	{ payload },
) => {
	handleSetBoard({
		state,
		boardId: "current",
		data: payload,
	});
};
