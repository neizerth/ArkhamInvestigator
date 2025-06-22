import { abilitiesPrefix } from "@modules/board/abilities/shared/config";
import type { InvestigatorBoardHistoryItem } from "@modules/board/history/shared/model";
import { createAction } from "@reduxjs/toolkit";
import type {
	ChangeBoardAbilityEventPayload,
	PropsWithAbility,
} from "../../../model";

export type ChangeBoardAbilityValuePayload = ChangeBoardAbilityEventPayload &
	PropsWithAbility & {
		value: number;
	};

export const changeBoardAbilityValue =
	createAction<ChangeBoardAbilityValuePayload>(
		`${abilitiesPrefix}/changeValue`,
	);

export type BoardAbilityValueChangedPayload = ChangeBoardAbilityValuePayload & {
	prevValue: number;
	historyItem: InvestigatorBoardHistoryItem;
};

export const boardAbilityValueChanged =
	createAction<BoardAbilityValueChangedPayload>(
		`${abilitiesPrefix}/valueChanged`,
	);
