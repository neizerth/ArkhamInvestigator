import { abilitiesPrefix } from "@modules/board/abilities/shared/config";
import { createAction } from "@reduxjs/toolkit";
import type { ToggleBoardAbilityUsePayload } from "../toggleBoardAbilityUse/toggleBoardAbilityUse";

export type SetBoardAbilityUsePayload = ToggleBoardAbilityUsePayload & {
	canUse: boolean;
	active?: boolean;
};

export const setBoardAbilityUse = createAction<SetBoardAbilityUsePayload>(
	`${abilitiesPrefix}/setBoardUse`,
);

export const boardAbilityUseSet = createAction<SetBoardAbilityUsePayload>(
	`${abilitiesPrefix}/boardUseSet`,
);
