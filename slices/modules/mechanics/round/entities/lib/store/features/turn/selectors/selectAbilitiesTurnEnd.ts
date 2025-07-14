import {
	selectHasAdditionalAction,
	selectIsAdditionalActionUsed,
} from "@modules/board/abilities/shared/lib";
import { selectBoardById } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { idIncludes } from "@shared/lib";
import type { RootState } from "@shared/model";
import { prop } from "ramda";

export const selectAbilitiesTurnEnd =
	(boardId: BoardId) => (state: RootState) => {
		const board = selectBoardById(boardId)(state);
		const hasAdditionalAction = selectHasAdditionalAction(boardId)(state);
		const isAdditionalActionUsed = selectIsAdditionalActionUsed(boardId)(state);

		if (hasAdditionalAction && !isAdditionalActionUsed) {
			return false;
		}

		const { abilities } = board.investigator;

		if (!abilities) {
			return true;
		}

		const additionalActionAbilities = abilities.filter(
			({ additionalAction }) => additionalAction,
		);

		if (additionalActionAbilities.length === 0) {
			return true;
		}

		const ids = additionalActionAbilities.map(prop("id"));
		const { usedAbilities = [] } = board;
		const usedAdditionalAbilities = usedAbilities.filter(idIncludes(ids));

		if (usedAdditionalAbilities.length === 0) {
			return false;
		}

		return true;
	};
