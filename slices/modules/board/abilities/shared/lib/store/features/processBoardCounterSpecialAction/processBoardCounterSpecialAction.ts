import { abilitiesPrefix } from "@modules/board/abilities/shared/config";
import type {
	ChangeBoardAbilityEventPayload,
	PropsWithAbility,
} from "@modules/board/abilities/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type ProcessBoardCounterSpecialActionPayload =
	ChangeBoardAbilityEventPayload & PropsWithAbility;

export const processBoardCounterSpecialAction =
	createAction<ProcessBoardCounterSpecialActionPayload>(
		`${abilitiesPrefix}/processBoardCounterSpecialAction`,
	);
