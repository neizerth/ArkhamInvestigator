import type { BoardReducer, InvestigatorBoard } from "../../../model";

export const addInvestigatorBoard: BoardReducer<InvestigatorBoard> = (
	state,
	{ payload },
) => {
	state.investigatorBoards.push(payload);
};
