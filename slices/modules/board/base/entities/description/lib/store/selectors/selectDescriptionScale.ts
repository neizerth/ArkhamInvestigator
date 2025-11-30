import {
	selectAlwaysShowGameText,
	selectBoardProp,
	selectShowDescription,
} from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { selectCurrentLanguage } from "@modules/core/i18n/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { getDescriptionScale } from "../../logic";

export const selectDescriptionScale = (boardId: BoardId) =>
	createSelector(
		[
			selectShowDescription,
			selectAlwaysShowGameText,
			selectBoardProp({
				boardId,
				prop: "investigator",
			}),
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
