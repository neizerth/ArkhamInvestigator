import { createBoardPropSelectorInput } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@shared/model";

export const selectHasAdditionalAction =
	(boardId: BoardId) => (state: RootState) =>
		select(state, boardId);

const select = createSelector(
	[createBoardPropSelectorInput("investigator")],
	(investigator) => investigator?.additionalAction === true,
);
