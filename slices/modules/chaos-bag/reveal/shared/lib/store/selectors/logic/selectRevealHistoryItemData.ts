import { selectBoardId } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import {
	selectChaosBagSkillCheckExpression,
	selectChaosBagSkillCheckTitle,
	selectChaosBagSkillCheckType,
	selectChaosBagSkillValue,
} from "@modules/chaos-bag/base/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { createRevealHistoryItemData } from "../../../logic";

export const selectRevealHistoryItemData = (boardId: BoardId) =>
	createSelector(
		[
			selectBoardId(boardId),
			selectChaosBagSkillCheckType,
			selectChaosBagSkillValue,
			selectChaosBagSkillCheckExpression,
			selectChaosBagSkillCheckTitle,
		],
		(boardId, skillCheckType, skillCheckValue, skillCheckExpression, title) => {
			if (typeof boardId === "undefined") {
				return;
			}
			return createRevealHistoryItemData({
				boardId,
				skillCheckType,
				skillCheckValue,
				skillCheckExpression,
				title,
			});
		},
	);
