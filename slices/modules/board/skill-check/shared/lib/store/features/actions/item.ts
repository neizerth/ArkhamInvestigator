import type { ChangeBoardEventPayload } from "@modules/board/base/shared/model";
import { skillCheckPrefix } from "@modules/board/skill-check/shared/config";
import { createAction } from "@reduxjs/toolkit";

export type BoardSkillCheckItemPayload = ChangeBoardEventPayload & {
	id: string;
};

export const nameBoardSkillCheckItemAction =
	createAction<BoardSkillCheckItemPayload>(`${skillCheckPrefix}/nameItem`);

export const pinBoardSkillCheckItemAction =
	createAction<BoardSkillCheckItemPayload>(`${skillCheckPrefix}/pinItem`);

export const unpinBoardSkillCheckItemAction =
	createAction<BoardSkillCheckItemPayload>(`${skillCheckPrefix}/unpinItem`);

export const togglePinBoardSkillCheckItemAction =
	createAction<BoardSkillCheckItemPayload>(`${skillCheckPrefix}/togglePinItem`);

export const removeBoardSkillCheckItemAction =
	createAction<BoardSkillCheckItemPayload>(`${skillCheckPrefix}/removeItem`);
