import { selectBoardId } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";

import {
	selectChaosBagSkillCheckExpression,
	selectChaosBagSkillCheckTitle,
	selectChaosBagSkillCheckType,
	selectChaosBagSkillValue,
	selectRevealedTokens,
} from "@modules/chaos-bag/reveal/base/shared/lib";
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
			selectRevealedTokens,
		],
		(
			boardId,
			skillCheckType,
			skillCheckValue,
			skillCheckExpression,
			title,
			tokens,
		) => {
			if (typeof boardId === "undefined") {
				return;
			}
			return createRevealHistoryItemData({
				boardId,
				skillCheckType,
				skillCheckValue,
				skillCheckExpression,
				title,
				tokens,
			});
		},
	);
