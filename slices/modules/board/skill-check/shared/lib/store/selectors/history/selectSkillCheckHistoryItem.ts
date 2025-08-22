import { selectBoardCheckHistory } from "@modules/board/base/shared/lib";
import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import type { SkillCheckHistoryItem } from "@modules/board/skill-check/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { whereId } from "@shared/lib/util";

type Options = PropsWithBoardId & {
	id: string;
};

export const selectSkillCheckHistoryItem = ({ boardId, id }: Options) =>
	createSelector(
		[selectBoardCheckHistory(boardId)],
		(history = []) => history.find(whereId(id)) as SkillCheckHistoryItem,
	);
