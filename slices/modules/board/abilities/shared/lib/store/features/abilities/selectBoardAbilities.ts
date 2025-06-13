import {
	selectBoardProp,
	selectBoardsCount,
} from "@modules/board/base/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import type { BoardId } from "@shared/model";
import { isBoardAbility } from "../../../info/isBoardAbility";

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
