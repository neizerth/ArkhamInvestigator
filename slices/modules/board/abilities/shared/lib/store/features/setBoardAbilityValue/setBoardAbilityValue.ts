import { abilitiesPrefix } from "@modules/board/abilities/shared/config";
import type {
	ChangeBoardAbilityEventPayload,
	PropsWithAbility,
} from "@modules/board/abilities/shared/model";
import type { InvestigatorBoardHistoryItem } from "@modules/board/history/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type SetBoardAbilityValuePayload = ChangeBoardAbilityEventPayload &
	PropsWithAbility & {
		value: number;
	};

export const setBoardAbilityValue = createAction<SetBoardAbilityValuePayload>(
	`${abilitiesPrefix}/setValue`,
);

export type BoardAbilityValueSetPayload = SetBoardAbilityValuePayload & {
	prevValue: number;
	historyItem: InvestigatorBoardHistoryItem;
};

export const boardAbilityValueSet = createAction<BoardAbilityValueSetPayload>(
	`${abilitiesPrefix}/valueSet`,
);
