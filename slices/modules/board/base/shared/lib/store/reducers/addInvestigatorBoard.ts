import type { BoardReducer, InvestigatorBoard } from "../../../model";
import { handleAddInvestigatorBoard } from "../handlers";

export const addInvestigatorBoard: BoardReducer<InvestigatorBoard> = (
	state,
	{ payload },
) => {
	handleAddInvestigatorBoard(state, payload);
};
