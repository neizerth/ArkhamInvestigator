import type { InvestigatorBoard } from "@modules/board/base/shared/model";

type Options = {
	investigatorBoards: InvestigatorBoard[];
	currentInvestigatorIndex: number | null;
};
export const getCurrentBoard = ({
	investigatorBoards,
	currentInvestigatorIndex,
}: Options) => {
	if (typeof currentInvestigatorIndex !== "number") {
		return;
	}

	return investigatorBoards[currentInvestigatorIndex];
};
