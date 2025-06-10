import { createSelector } from "@reduxjs/toolkit";
import type { BoardId } from "@shared/model";
import { selectCurrentProp } from "../props";

export const selectBoardId = (boardId: BoardId = "current") =>
	createSelector(
		[
			selectCurrentProp({
				prop: "id",
			}),
		],
		(currentId) => (boardId === "current" ? currentId : boardId),
	);
