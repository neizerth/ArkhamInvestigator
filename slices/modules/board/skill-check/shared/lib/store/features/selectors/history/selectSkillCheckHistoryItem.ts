import { selectBoardCheckHistory } from "@modules/board/base/shared/lib";
import type { PropsWithBoard } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { whereId } from "@shared/lib";
import type { SkillCheckHistoryItem } from "@shared/model";

type Options = PropsWithBoard & {
	id: string;
};

export const selectSkillCheckHistoryItem = ({ boardId, id }: Options) =>
	createSelector(
		[selectBoardCheckHistory(boardId)],
		(history = []) => history.find(whereId(id)) as SkillCheckHistoryItem,
	);
