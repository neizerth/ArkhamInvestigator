import { additionalActionAbilityId } from "@modules/board/abilities/shared/config";

import type { AppThunk } from "@shared/model";
import {
	type SetBoardAbilityUsePayload,
	setBoardAbilityUse,
} from "../features";

export type SetAdditionalActionUsePayload = Omit<
	SetBoardAbilityUsePayload,
	"abilityId"
>;

export const setAdditionalActionUse =
	(options: SetAdditionalActionUsePayload): AppThunk =>
	(dispatch) => {
		dispatch(
			setBoardAbilityUse({
				...options,
				abilityId: additionalActionAbilityId,
			}),
		);
	};
