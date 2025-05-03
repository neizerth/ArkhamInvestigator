import { createSelector } from "@reduxjs/toolkit";
import type { BoardId } from "@shared/model";
import { prop } from "ramda";
import { propIncludes } from "../../../../../../util";
import { selectEndTurnStrict } from "../../../board";
import { selectBoardById } from "../../selectBoardById";

export const selectAbilitiesTurnEnd = (boardId: BoardId) =>
	createSelector(
		[selectBoardById(boardId), selectEndTurnStrict],
		(board, strict) => {
			if (!board) {
				return false;
			}

			if (!strict) {
				return false;
			}

			if (board.baseValue.additionalAction && !board.value.additionalAction) {
				return false;
			}

			const { abilities } = board.investigator;

			if (!abilities) {
				return false;
			}

			const additionalActionAbilities = abilities.filter(
				({ additionalAction }) => additionalAction,
			);

			if (additionalActionAbilities.length === 0) {
				return false;
			}

			const ids = additionalActionAbilities.map(prop("id"));
			const { usedAbilities = [] } = board;
			const usedAdditionalAbilities = usedAbilities.filter(
				propIncludes("id", ids),
			);

			if (usedAdditionalAbilities.length === 0) {
				return false;
			}

			return false;
		},
	);
