import {
	createBoardPropSelectorInput,
	selectAlwaysShowGameText,
	selectShowDescription,
} from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { selectCurrentLanguage } from "@modules/core/i18n/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@shared/model";
import { getDescriptionScale } from "../../logic";

export const selectDescriptionScale =
	(boardId: BoardId) => (state: RootState) =>
		select(state, boardId);

const select = createSelector(
	[
		selectShowDescription,
		selectAlwaysShowGameText,
		createBoardPropSelectorInput("investigator"),
		selectCurrentLanguage,
	],
	(descriptionShown, alwaysShowText, { text }, language) => {
		return getDescriptionScale({
			descriptionShown,
			alwaysShowText,
			text,
			language,
		});
	},
);
