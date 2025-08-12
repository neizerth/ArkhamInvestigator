import {
	selectBoardProp,
	selectBoardsCount,
} from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { getInvestigatorBoardAbilities } from "../getters";

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
			return getInvestigatorBoardAbilities({
				investigator,
				investigatorsCount,
			});
		},
	);
