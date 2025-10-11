import type { InvestigatorBoard } from "@modules/board/base/shared/model";

export const getBoardFaction = (board: InvestigatorBoard) => {
	return board.faction || board.investigator.faction_code;
};
