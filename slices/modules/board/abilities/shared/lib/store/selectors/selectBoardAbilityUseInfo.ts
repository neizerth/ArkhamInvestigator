import { selectBoardUsedAbilities } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@shared/model";
import { getBoardAbilityUseInfo } from "../getters";

export type SelectAbilityUseInfoOptions = {
	abilityId: string;
	boardId: BoardId;
};

export const selectBoardAbilityUseInfo =
	({ abilityId, boardId }: SelectAbilityUseInfoOptions) =>
	(state: RootState) =>
		select(state, boardId, abilityId);

const select = createSelector(
	[
		(state, boardId: BoardId) => selectBoardUsedAbilities(boardId)(state),
		(_, _boardId, abilityId: string) => abilityId,
	],
	(usedAbilities, abilityId) => {
		return getBoardAbilityUseInfo({
			abilityId,
			usedAbilities,
		});
	},
);
