import { selectEndTurnStrict } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import type { RootState } from "@shared/model";
import { selectAbilitiesTurnEnd } from "./selectAbilitiesTurnEnd";
import { selectBaseTurnEnd } from "./selectBaseTurnEnd";

export const selectTurnEnd = (boardId: BoardId) => (state: RootState) => {
	const baseTurnEnd = selectBaseTurnEnd(boardId)(state);
	const abilitiesTurnEnd = selectAbilitiesTurnEnd(boardId)(state);
	const strict = selectEndTurnStrict(state);
	if (!baseTurnEnd) {
		return false;
	}
	return strict ? abilitiesTurnEnd : false;
};
