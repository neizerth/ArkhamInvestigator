import { selectBoardProp } from "@modules/board/base/shared/lib/store/features/board/selectors/props";
import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { whereId } from "@shared/lib";

export type SelectAbilityUseInfoOptions = {
	abilityId: string;
	boardId: BoardId;
};

export const selectBoardAbilityUseInfo = ({
	abilityId,
	boardId,
}: SelectAbilityUseInfoOptions) =>
	createSelector(
		[
			selectBoardProp({
				boardId,
				prop: "usedAbilities",
			}),
		],
		(data) => data?.find(whereId(abilityId)),
	);
