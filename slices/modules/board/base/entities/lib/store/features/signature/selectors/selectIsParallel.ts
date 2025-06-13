import { selectBoardProp } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";

export const selectIsParallel = (boardId: BoardId) =>
	createSelector(
		[
			selectBoardProp({
				boardId,
				prop: "investigator",
			}),
		],
		(investigator) => investigator?.type === "parallel",
	);
