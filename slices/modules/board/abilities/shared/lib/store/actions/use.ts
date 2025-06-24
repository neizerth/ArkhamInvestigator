import { abilitiesPrefix } from "@modules/board/abilities/shared/config";
import type {
	ChangeBoardAbilityEventPayload,
	InvestigatorBoardUsedAbility,
	PropsWithAbility,
} from "@modules/board/abilities/shared/model";
import type { BoardId } from "@modules/board/base/shared/model";
import type { BoardHistoryItemAddedPayload } from "@modules/board/history/shared/lib";
import { createAction } from "@reduxjs/toolkit";

export type ToggleBoardAbilityUsePayload = ChangeBoardAbilityEventPayload &
	PropsWithAbility & {
		abilityTargetBoardId?: BoardId;
	};

export const toggleBoardAbilityUse = createAction<ToggleBoardAbilityUsePayload>(
	`${abilitiesPrefix}/toggleBoardUse`,
);

export type SetBoardAbilityUsePayload = ToggleBoardAbilityUsePayload & {
	use: boolean;
};

export const setBoardAbilityUse = createAction<SetBoardAbilityUsePayload>(
	`${abilitiesPrefix}/setBoardUse`,
);

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
