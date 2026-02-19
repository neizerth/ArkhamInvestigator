import { selectBoardProp } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@shared/model";

export const selectInvestigatorAbilities =
	(boardId: BoardId) => (state: RootState) =>
		select(state, boardId);

const select = createSelector(
	[
		(state, boardId: BoardId) =>
			selectBoardProp({ prop: "investigator", boardId })(state),
	],
	(investigator) => {
		return investigator.abilities || [];
	},
);
