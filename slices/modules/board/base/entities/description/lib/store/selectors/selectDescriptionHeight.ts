import {
	selectAlwaysShowGameText,
	selectBoardProp,
} from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";

import { selectCurrentFaction } from "@modules/mechanics/board/base/entities/lib";
import { getDescriptionHeight } from "../../logic";

export const selectDescriptionHeight = (boardId: BoardId) =>
	createSelector(
		[
			selectAlwaysShowGameText,
			selectBoardProp({
				boardId,
				prop: "gameTextSize",
			}),
			selectCurrentFaction,
		],
		(showGameText, gameTextSize, faction) => {
			return getDescriptionHeight({
				showGameText,
				gameTextSize,
				faction,
			});
		},
	);
