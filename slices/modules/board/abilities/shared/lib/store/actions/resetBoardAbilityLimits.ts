import { abilitiesPrefix } from "@modules/board/abilities/shared/config";
import type { ChangeBoardEventPayload } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";
import type { LimitType } from "arkham-investigator-data";

export type SetUsedAbilitiesPayload = ChangeBoardEventPayload & {
	limitTypes: LimitType[];
};

export const resetBoardAbilityLimits = createAction<SetUsedAbilitiesPayload>(
	`${abilitiesPrefix}/resetLimits`,
);
