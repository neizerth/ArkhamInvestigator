import type { ChangeBoardEventPayload } from "@modules/board/base/shared/model";
import { skillCheckPrefix } from "@modules/board/skill-check/shared/config";
import type { SkillCheckHistoryItem } from "@modules/board/skill-check/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type AddBoardSkillCheckItemPayload = ChangeBoardEventPayload & {
	value: SkillCheckHistoryItem;
};

export const addBoardSkillCheckItem =
	createAction<AddBoardSkillCheckItemPayload>(`${skillCheckPrefix}/addItem`);
