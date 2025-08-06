import { abilitiesPrefix } from "@modules/board/abilities/shared/config";
import { createAction } from "@reduxjs/toolkit";
import type { ToggleBoardAbilityUsePayload } from "../toggleBoardAbilityUse";

export const checkBoardAbilityUse = createAction<ToggleBoardAbilityUsePayload>(
	`${abilitiesPrefix}/checkBoardUse`,
);

export const checkBoardAbilityUseFailed =
	createAction<ToggleBoardAbilityUsePayload>(
		`${abilitiesPrefix}/checkBoardUseFailed`,
	);

export const checkBoardAbilityUseSuccess =
	createAction<ToggleBoardAbilityUsePayload>(
		`${abilitiesPrefix}/checkBoardUseSuccess`,
	);
