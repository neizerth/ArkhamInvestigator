import {
	selectAlwaysShowGameText,
	selectBoardProp,
} from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";

import { getDescriptionHeight } from "../../logic";

export const selectDescriptionHeight = (boardId: BoardId) =>
	createSelector(
		[
			selectAlwaysShowGameText,
			selectBoardProp({
				boardId,
				prop: "gameTextHeight",
			}),
		],
		(showGameText, gameTextHeight) => {
			return getDescriptionHeight({
				showGameText,
				gameTextHeight,
			});
		},
	);
