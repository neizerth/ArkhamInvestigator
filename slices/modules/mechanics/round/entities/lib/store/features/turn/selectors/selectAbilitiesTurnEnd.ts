import { selectIsAdditionalActionUsed } from "@modules/board/abilities/shared/lib/store/selectors/additional-action";
import { selectBoardById } from "@modules/board/base/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { idIncludes, selectHaveAdditionalAction } from "@shared/lib";
import type { BoardId } from "@shared/model";
import { prop } from "ramda";

export const selectAbilitiesTurnEnd = (boardId: BoardId) =>
	createSelector(
		[
			selectBoardById(boardId),
			selectHaveAdditionalAction,
			selectIsAdditionalActionUsed,
		],
		(board, haveAdditionalAction, isAdditionalActionUsed) => {
			if (!board) {
				return true;
			}

			if (haveAdditionalAction && !isAdditionalActionUsed) {
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
		},
	);
