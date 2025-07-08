import {
	selectBoardProp,
	selectBoardsCount,
} from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { isBoardAbility } from "../../info/isBoardAbility";

export const selectBoardAbilities = (boardId: BoardId) =>
	createSelector(
		[
			selectBoardProp({
				prop: "investigator",
				boardId,
			}),
			selectBoardsCount,
		],
		(investigator, investigatorsCount) => {
			if (!investigator) {
				return [];
			}
			const { abilities = [] } = investigator;
			return abilities.filter((ability) =>
				isBoardAbility({
					ability,
					investigatorsCount,
				}),
			);
		},
	);
