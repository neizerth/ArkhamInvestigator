import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "@shared/model";
import { getDescriptionBottomOffset } from "../../logic";
import { selectDescriptionHeight } from "./selectDescriptionHeight";

export const selectDescriptionBottomOffset =
	(boardId: BoardId) => (state: RootState) =>
		select(state, boardId);

const select = createSelector(
	[(state, boardId: BoardId) => selectDescriptionHeight(boardId)(state)],
	(descriptionHeight) => {
		return getDescriptionBottomOffset(descriptionHeight);
	},
);
