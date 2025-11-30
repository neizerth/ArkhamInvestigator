import { selectBoardProp } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";

export const selectInvestigatorAbilities = (boardId: BoardId) =>
	createSelector(
		[selectBoardProp({ prop: "investigator", boardId })],
		(investigator) => {
			return investigator.abilities || [];
		},
	);
