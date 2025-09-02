import { createSelector } from "@reduxjs/toolkit";
import { selectBoardsCount } from "../selectBoardsCount";
import { selectLoadedBoardsCount } from "./selectLoadedBoardsCount";

export const selectBoardsLoadProgress = createSelector(
	[selectBoardsCount, selectLoadedBoardsCount],
	(total, loaded) => {
		const progress = Math.round((loaded * 100) / total);

		return progress;
	},
);
