import {
	selectBoardProp,
	selectBoardsCount,
} from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { additionalActionAbility } from "../../../config";
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
			const baseAbilities = abilities.filter((ability) =>
				isBoardAbility({
					ability,
					investigatorsCount,
				}),
			);

			if (!investigator.additionalAction) {
				return baseAbilities;
			}

			return [...baseAbilities, additionalActionAbility];
		},
	);
