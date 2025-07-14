import { additionalActionAbilityId } from "@modules/board/abilities/shared/config";
import type { BoardId } from "@modules/board/base/shared/model";
import type { RootState } from "@shared/model";
import { selectBoardAbilityUseInfo } from "../selectBoardAbilityUseInfo";

export const selectIsAdditionalActionUsed =
	(boardId: BoardId) => (state: RootState) => {
		const abilityUseInfo = selectBoardAbilityUseInfo({
			boardId,
			abilityId: additionalActionAbilityId,
		})(state);
		return !abilityUseInfo;
	};
