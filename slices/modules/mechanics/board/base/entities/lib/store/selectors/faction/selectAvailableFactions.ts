import { selectBoardProp } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { getAvailableFactions } from "../../../logic";

export const selectAvailableFactions = (boardId: BoardId) =>
	createSelector(
		[
			selectBoardProp({
				boardId,
				prop: "investigator",
			}),
		],
		(investigator) => {
			if (!investigator) {
				return [];
			}
			return getAvailableFactions({ investigator });
		},
	);
