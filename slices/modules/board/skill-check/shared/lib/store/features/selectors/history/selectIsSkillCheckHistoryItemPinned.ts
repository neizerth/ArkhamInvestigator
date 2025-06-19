import type { PropsWithBoard } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { selectSkillCheckHistoryItem } from "./selectSkillCheckHistoryItem";

type Options = PropsWithBoard & {
	id: string;
};

export const selectIsSkillCheckHistoryItemPinned = (options: Options) =>
	createSelector([selectSkillCheckHistoryItem(options)], (item) =>
		Boolean(item?.pinned),
	);
