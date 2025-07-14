import { abilitiesPrefix } from "@modules/board/abilities/shared/config";
import type {
	ChangeBoardAbilityEventPayload,
	PropsWithAbility,
} from "@modules/board/abilities/shared/model";
import type { BoardId } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type ToggleBoardAbilityUsePayload = ChangeBoardAbilityEventPayload &
	PropsWithAbility & {
		abilityTargetBoardId?: BoardId;
	};

export const toggleBoardAbilityUse = createAction<ToggleBoardAbilityUsePayload>(
	`${abilitiesPrefix}/toggleBoardUse`,
);
