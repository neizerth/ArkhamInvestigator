import type { PropsWithBoard } from "@modules/board/base/shared/model";
import { skillCheckPrefix } from "@modules/board/skill-check/shared/config";
import type { SkillCheckHistoryItem } from "@modules/board/skill-check/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type AddBoardSkillCheckItem = PropsWithBoard & {
	value: SkillCheckHistoryItem;
};

export const addBoardSkillCheckItemAction = createAction(
	`${skillCheckPrefix}/addItem`,
);
