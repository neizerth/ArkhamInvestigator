import { abilitiesPrefix } from "@modules/board/abilities/shared/config";
import type { AbilityUsePayload } from "@modules/board/abilities/shared/model";
import { createAction } from "@reduxjs/toolkit";

export const setBoardAbilityUseAction = createAction<AbilityUsePayload>(
	`${abilitiesPrefix}/setBoardUse`,
);

export const resetBoardAbilityUseAction = createAction<AbilityUsePayload>(
	`${abilitiesPrefix}/resetBoardUse`,
);

export const toggleBoardAbilityUseAction = createAction<AbilityUsePayload>(
	`${abilitiesPrefix}/toggleBoardUse`,
);
