import type { ChangeBoardEventPayload } from "@modules/board/base/shared/model";
import { skillCheckPrefix } from "@modules/board/skill-check/shared/config";
import { createAction } from "@reduxjs/toolkit";

export type RemoveBoardSkillCheckItemPayload = ChangeBoardEventPayload & {
	id: string;
};

export const removeBoardSkillCheckItem =
	createAction<RemoveBoardSkillCheckItemPayload>(
		`${skillCheckPrefix}/removeItem`,
	);
