import {
	selectBoardId,
	selectBoardsCount,
} from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@shared/model";
import { getIsAbilityUsed } from "../../getters/getIsAbilityUsed";
import { selectBoardAbilityById } from "../selectBoardAbilityById";
import { selectBoardAbilityUseInfo } from "../selectBoardAbilityUseInfo";

type Options = {
	abilityId: string;
	boardId: BoardId;
	abilityTargetBoardId?: BoardId;
};
export const selectIsBoardAbilityUsed =
	({ abilityId, boardId, abilityTargetBoardId }: Options) =>
	(state: RootState) =>
		select(state, boardId, abilityId, abilityTargetBoardId);

const select = createSelector(
	[
		(_, boardId: BoardId) => boardId,
		(state, boardId: BoardId, abilityId: string) =>
			selectBoardAbilityById({ boardId, abilityId })(state),
		(state, boardId: BoardId, abilityId: string) =>
			selectBoardAbilityUseInfo({ boardId, abilityId })(state),
		(
			state,
			_boardId: BoardId,
			_abilityId: string,
			abilityTargetBoardId?: BoardId,
		) =>
			abilityTargetBoardId
				? selectBoardId(abilityTargetBoardId)(state)
				: void abilityTargetBoardId,
		selectBoardsCount,
	],
	(_, ability, usedAbility, targetBoardId, boardsCount) => {
		return getIsAbilityUsed({
			ability,
			usedAbility,
			targetBoardId,
			boardsCount,
		});
	},
);
