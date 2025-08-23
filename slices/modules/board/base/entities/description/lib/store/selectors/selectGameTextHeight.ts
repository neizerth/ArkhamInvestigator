import { selectBoardProp } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";

export const selectGameTextHeight = (boardId: BoardId) =>
	createSelector(
		[
			selectBoardProp({
				boardId,
				prop: "gameTextSize",
			}),
		],
		(size) => size?.height ?? 0,
	);
