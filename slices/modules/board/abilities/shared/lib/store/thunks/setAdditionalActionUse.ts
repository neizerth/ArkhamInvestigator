import { additionalActionAbilityId } from "@modules/board/abilities/shared/config";
import {
	type SetBoardAbilityUsePayload,
	setBoardAbilityUse,
} from "@modules/board/abilities/shared/lib";
import type { AppThunk } from "@shared/model";

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
