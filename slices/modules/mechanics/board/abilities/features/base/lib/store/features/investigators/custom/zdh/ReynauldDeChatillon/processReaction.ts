import { abilitiesPrefix } from "@modules/board/abilities/shared/config";
import type { PropsWithAbility } from "@modules/board/abilities/shared/model";
import type {
	BoardId,
	PropsWithBoardId,
} from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type ProcessReactionAbilityPayload = PropsWithBoardId &
	PropsWithAbility & {
		targetBoardId: BoardId;
	};

export const processReaction = createAction<ProcessReactionAbilityPayload>(
	`${abilitiesPrefix}/processReaction`,
);
