import type { InvestigatorBoard } from "@modules/board/base/shared/model";

export type GetCurrentBoardOptions = {
	investigatorBoards: InvestigatorBoard[];
	currentInvestigatorIndex: number | null;
};
export const getCurrentBoard = ({
	investigatorBoards,
	currentInvestigatorIndex,
}: GetCurrentBoardOptions) => {
	if (typeof currentInvestigatorIndex !== "number") {
		return;
	}

	return investigatorBoards[currentInvestigatorIndex];
};
