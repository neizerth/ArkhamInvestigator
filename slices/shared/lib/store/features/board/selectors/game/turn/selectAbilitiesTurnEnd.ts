import { createSelector } from "@reduxjs/toolkit";
import type { BoardId } from "@shared/model";
import { prop } from "ramda";
import { propIncludes } from "../../../../../../util";
import { selectBoardById } from "../../selectBoardById";

export const selectAbilitiesTurnEnd = (boardId: BoardId) =>
	createSelector([selectBoardById(boardId)], (board) => {
		if (!board) {
			return true;
		}

		if (board.baseValue.additionalAction && board.value.additionalAction) {
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
		const usedAdditionalAbilities = usedAbilities.filter(
			propIncludes("id", ids),
		);

		if (usedAdditionalAbilities.length === 0) {
			return false;
		}

		return true;
	});
