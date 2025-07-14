import { abilitiesPrefix } from "@modules/board/abilities/shared/config";
import type { PropsWithAbility } from "@modules/board/abilities/shared/model";
import type {
	BoardId,
	PropsWithBoardId,
} from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type AddWildAbilityPayload = PropsWithBoardId &
	PropsWithAbility & {
		targetBoardId: BoardId;
	};

export const addWild = createAction<AddWildAbilityPayload>(
	`${abilitiesPrefix}/addWild`,
);
