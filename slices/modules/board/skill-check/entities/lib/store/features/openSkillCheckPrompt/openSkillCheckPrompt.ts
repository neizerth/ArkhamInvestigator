import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { skillCheckPrefix } from "@modules/board/skill-check/shared/config";
import { createAction } from "@reduxjs/toolkit";

export type OpenSkillCheckPromptPayload = PropsWithBoardId & {
	id: string;
	itemId: string;
};

export const openSkillCheckPrompt = createAction<OpenSkillCheckPromptPayload>(
	`${skillCheckPrefix}/openPrompt`,
);
