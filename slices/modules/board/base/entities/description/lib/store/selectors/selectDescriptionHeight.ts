import {
	createBoardPropSelectorInput,
	selectAlwaysShowGameText,
} from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";

import { selectCurrentFaction } from "@modules/mechanics/board/base/entities/lib";
import type { RootState } from "@shared/model";
import { getDescriptionHeight } from "../../logic";

export const selectDescriptionHeight =
	(boardId: BoardId) => (state: RootState) =>
		select(state, boardId);

const select = createSelector(
	[
		selectAlwaysShowGameText,
		createBoardPropSelectorInput("gameTextSize"),
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
