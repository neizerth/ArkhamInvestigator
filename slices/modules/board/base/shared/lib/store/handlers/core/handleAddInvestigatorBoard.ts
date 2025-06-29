import type {
	BoardHandler,
	InvestigatorBoard,
} from "@modules/board/base/shared/model";

export const handleAddInvestigatorBoard: BoardHandler<InvestigatorBoard> = (
	state,
	payload,
) => {
	state.investigatorBoards.push(payload);
};
