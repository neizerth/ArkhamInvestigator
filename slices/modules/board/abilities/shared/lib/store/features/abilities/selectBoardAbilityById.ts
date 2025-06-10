import { selectBoardProp } from "@modules/board/base/shared/lib/store/features/board/selectors/props/selectBoardProp";
import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { whereId } from "@shared/lib";

export type SelectAbilityByIdOptions = {
	boardId?: BoardId;
	abilityId: string;
};

export const selectBoardAbilityById = ({
	boardId,
	abilityId,
}: SelectAbilityByIdOptions) =>
	createSelector(
		[
			selectBoardProp({
				boardId,
				prop: "investigator",
			}),
		],
		(investigator) => {
			if (!investigator) {
				return;
			}
			const { abilities = [] } = investigator;
			return abilities.find(whereId(abilityId));
		},
	);
