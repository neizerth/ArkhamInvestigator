import { abilitiesPrefix } from "@modules/board/abilities/shared/config";
import type { AbilityUsePayload } from "@modules/board/abilities/shared/model";
import { createAction } from "@reduxjs/toolkit";

export const setBoardAbilityUse = createAction<AbilityUsePayload>(
	`${abilitiesPrefix}/setBoardUse`,
);

export const resetBoardAbilityUse = createAction<AbilityUsePayload>(
	`${abilitiesPrefix}/resetBoardUse`,
);

export const toggleBoardAbilityUse = createAction<AbilityUsePayload>(
	`${abilitiesPrefix}/toggleBoardUse`,
);
