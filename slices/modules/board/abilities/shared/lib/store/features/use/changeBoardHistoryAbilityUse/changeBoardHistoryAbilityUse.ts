import { abilitiesPrefix } from "@modules/board/abilities/shared/config";
import type { InvestigatorBoardUsedAbility } from "@modules/board/abilities/shared/model";
import type { BoardHistoryItemAddedPayload } from "@modules/board/history/shared/lib";
import { createAction } from "@reduxjs/toolkit";

export type ChangedInvestigatorBoardUsedAbility =
	InvestigatorBoardUsedAbility & {
		isUsed: boolean;
	};

export type ChangeBoardHistoryAbilityUsePayload =
	BoardHistoryItemAddedPayload & {
		changedAbilities: ChangedInvestigatorBoardUsedAbility[];
	};

export const changeBoardHistoryAbilityUse =
	createAction<ChangeBoardHistoryAbilityUsePayload>(
		`${abilitiesPrefix}/changeBoardHistoryUse`,
	);
