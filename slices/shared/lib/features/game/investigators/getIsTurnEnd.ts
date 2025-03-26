import type { InvestigatorBoard } from "@shared/model";

type GetTurnEndOptions = {
	board: InvestigatorBoard;
	strict: boolean;
};
export const getIsTurnEnd = ({ board, strict }: GetTurnEndOptions) => {
	const { value, baseValue } = board;
	const { actions, additionalAction } = value;

	if (actions > 0) {
		return false;
	}

	if (!baseValue.additionalAction || !strict) {
		return actions === 0;
	}

	return !additionalAction;
};
