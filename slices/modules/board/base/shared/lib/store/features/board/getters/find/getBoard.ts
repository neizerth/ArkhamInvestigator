import type { InvestigatorBoard } from "@modules/board/base/shared/model";
import type { BoardState } from "../../board";

type Options = {
	state: BoardState;
	selector: (board: InvestigatorBoard) => boolean;
};
export const getBoard = ({ state, selector }: Options) => {
	const { investigatorBoards } = state;
	return investigatorBoards.find(selector);
};
