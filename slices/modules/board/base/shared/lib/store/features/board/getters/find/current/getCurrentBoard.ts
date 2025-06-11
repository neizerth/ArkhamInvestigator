import type { BoardState } from "../../../board";

type Options = {
	state: Pick<BoardState, "investigatorBoards" | "currentInvestigatorIndex">;
};
export const getCurrentBoard = ({ state }: Options) => {
	const { investigatorBoards, currentInvestigatorIndex } = state;

	if (typeof currentInvestigatorIndex !== "number") {
		return;
	}

	return investigatorBoards[currentInvestigatorIndex];
};
