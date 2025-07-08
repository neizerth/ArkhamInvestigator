import type { ChangeBoardEventPayload } from "@modules/board/base/shared/model";
import { skillCheckPrefix } from "@modules/board/skill-check/shared/config";
import { createAction } from "@reduxjs/toolkit";

export type AddBoardSkillCheckItemPayload = ChangeBoardEventPayload;

export const addBoardSkillCheckItem =
	createAction<AddBoardSkillCheckItemPayload>(`${skillCheckPrefix}/addItem`);
