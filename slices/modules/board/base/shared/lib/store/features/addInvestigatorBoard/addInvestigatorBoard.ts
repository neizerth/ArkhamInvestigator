import type {
	BoardReducer,
	InvestigatorBoard,
} from "@modules/board/base/shared/model";
import { handleAddInvestigatorBoard } from "./handleAddInvestigatorBoard";

export const addInvestigatorBoard: BoardReducer<InvestigatorBoard> = (
	state,
	{ payload },
) => {
	handleAddInvestigatorBoard(state, payload);
};
