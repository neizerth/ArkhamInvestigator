import { selectBoardAbilities } from "@modules/board/abilities/shared/lib";
import { selectBoardById } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { hiddenAbilityCodes } from "@modules/mechanics/board/abilities/shared/config";
import { createSelector } from "@reduxjs/toolkit";
import { getAbilityModification } from "../../logic";

export const selectBoardSpecialAbilities = (boardId: BoardId) =>
	createSelector(
		[selectBoardAbilities(boardId), selectBoardById(boardId)],
		(abilities, board) => {
			return abilities
				.filter(({ id }) => !hiddenAbilityCodes.includes(id))
				.map((ability) =>
					getAbilityModification({
						ability,
						board,
					}),
				);
		},
	);
