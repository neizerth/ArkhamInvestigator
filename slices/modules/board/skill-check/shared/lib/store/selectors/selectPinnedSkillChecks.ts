import { selectBoardProp } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";

export const selectPinnedSkillChecks = (boardId: BoardId) =>
	createSelector(
		[
			selectBoardProp({
				boardId,
				prop: "checkHistory",
			}),
		],
		(items = []) => items.filter(({ pinned }) => pinned),
	);
