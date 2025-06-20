import { abilitiesPrefix } from "@modules/board/abilities/shared/config";
import type { ChangeBoardEventPayload } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";
import type { PropsWithAbility } from "../../../model";

export type ChangeBoardAbilityValuePayload = ChangeBoardEventPayload &
	PropsWithAbility & {
		value: number;
	};

export const changeBoardAbilityValue =
	createAction<ChangeBoardAbilityValuePayload>(
		`${abilitiesPrefix}/changeValue`,
	);

export type BoardAbilityValueChangedPayload = ChangeBoardAbilityValuePayload & {
	prevValue: number;
};

export const boardAbilityValueChanged =
	createAction<BoardAbilityValueChangedPayload>(
		`${abilitiesPrefix}/valueChanged`,
	);
