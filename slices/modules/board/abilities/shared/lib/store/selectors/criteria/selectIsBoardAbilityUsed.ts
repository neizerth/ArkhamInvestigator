import {
	selectBoardId,
	selectBoardsCount,
} from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import type { AppSelector } from "@shared/model";
import { getIsAbilityUsed } from "../../getters/getIsAbilityUsed";
import { selectBoardAbilityById } from "../selectBoardAbilityById";
import { selectBoardAbilityUseInfo } from "../selectBoardAbilityUseInfo";

type Options = {
	abilityId: string;
	boardId: BoardId;
	abilityTargetBoardId?: BoardId;
};

export const selectIsBoardAbilityUsed = (
	options: Options,
): AppSelector<boolean> => {
	const { abilityTargetBoardId } = options;

	return (state) => {
		const ability = selectBoardAbilityById(options)(state);
		const usedAbility = selectBoardAbilityUseInfo(options)(state);
		const targetBoardId =
			abilityTargetBoardId && selectBoardId(abilityTargetBoardId)(state);
		const boardsCount = selectBoardsCount(state);

		return getIsAbilityUsed({
			ability,
			usedAbility,
			targetBoardId,
			boardsCount,
		});
	};
};
