import { selectBoardProp } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { whereId } from "@shared/lib/util";

export type SelectAbilityByIdOptions = {
	boardId: BoardId;
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
