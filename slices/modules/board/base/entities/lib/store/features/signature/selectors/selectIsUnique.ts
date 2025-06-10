import { selectBoardProp } from "@modules/board/base/shared/lib/store/features/board/selectors/props/selectBoardProp";
import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";

export const selectBoardIsUnique = (boardId: BoardId) =>
	createSelector(
		[
			selectBoardProp({
				boardId,
				prop: "investigator",
			}),
		],
		(investigator) => {
			return !investigator?.multiselect;
		},
	);
