import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { selectSkillCheckHistoryItem } from "./selectSkillCheckHistoryItem";

type Options = PropsWithBoardId & {
	id: string;
};

export const selectSkillCheckHistoryItemTitle = (options: Options) =>
	createSelector([selectSkillCheckHistoryItem(options)], (item) => item?.title);
