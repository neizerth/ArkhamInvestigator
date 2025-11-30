import { abilitiesPrefix } from "@modules/board/abilities/shared/config";
import type { ChangeBoardEventPayload } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";
import type {
	InvestigatorAbilityType,
	LimitType,
} from "arkham-investigator-data";

export type ResetBoardAbilitiesPayload = ChangeBoardEventPayload & {
	type?: "board" | "investigator";
	limitTypes?: LimitType[];
	abilityTypes?: InvestigatorAbilityType["type"][];
};

export const resetBoardAbilities = createAction<ResetBoardAbilitiesPayload>(
	`${abilitiesPrefix}/resetLimits`,
);
