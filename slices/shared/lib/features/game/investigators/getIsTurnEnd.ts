import type { InvestigatorBoard } from "@shared/model";

type GetTurnEndOptions = {
	board: InvestigatorBoard;
	strict: boolean;
};
export const getIsTurnEnd = ({ board, strict }: GetTurnEndOptions) => {
	const { actions, additionalAction } = board.value;

	if (strict) {
		return actions === 0 && additionalAction !== true;
	}

	return actions === 0;
};
