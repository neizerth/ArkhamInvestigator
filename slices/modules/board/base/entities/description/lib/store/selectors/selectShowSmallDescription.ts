import {
	selectAlwaysShowGameText,
	selectBoardProp,
	selectBoardsCount,
} from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { selectCurrentLanguage } from "@modules/core/i18n/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { isSmallDescription } from "../../logic";

export const selectShowSmallDescription = (boardId: BoardId) =>
	createSelector(
		[
			selectAlwaysShowGameText,
			selectBoardsCount,
			selectBoardProp({
				boardId,
				prop: "investigator",
			}),
			selectCurrentLanguage,
		],
		(alwaysShowText, boardsCount, { text }, language) => {
			return isSmallDescription({
				alwaysShowText,
				boardsCount,
				text,
				language,
			});
		},
	);
