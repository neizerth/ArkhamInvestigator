import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";

import { getDescriptionBottomOffset } from "../../logic";
import { selectDescriptionHeight } from "./selectDescriptionHeight";

export const selectDescriptionBottomOffset = (boardId: BoardId) =>
	createSelector([selectDescriptionHeight(boardId)], (descriptionHeight) => {
		return getDescriptionBottomOffset(descriptionHeight);
	});
