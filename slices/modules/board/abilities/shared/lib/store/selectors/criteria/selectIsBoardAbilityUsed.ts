import {
	selectBoardId,
	selectBoardsCount,
} from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import type { AppSelector } from "@shared/model";
import { selectBoardAbilityById } from "../selectBoardAbilityById";
import { selectBoardAbilityUseInfo } from "../selectBoardAbilityUseInfo";

type Options = {
	abilityId: string;
	boardId: BoardId;
	abilityTargetBoardId?: BoardId;
};

export const selectBoardIsAbilityUsed = (
	options: Options,
): AppSelector<boolean> => {
	const { abilityTargetBoardId } = options;

	return (state) => {
		const ability = selectBoardAbilityById(options)(state);
		const data = selectBoardAbilityUseInfo(options)(state);
		const targetBoardId =
			abilityTargetBoardId && selectBoardId(abilityTargetBoardId)(state);
		const boardsCount = selectBoardsCount(state);

		if (!data) {
			return false;
		}

		if (!ability?.perInvestigator || !data.boardIds) {
			return true;
		}

		if (typeof targetBoardId === "number") {
			return data.boardIds.includes(targetBoardId);
		}

		const { personalUse } = ability;

		const maxUses = personalUse ? boardsCount : boardsCount - 1;
		const usesCount = data.boardIds.length;
		return usesCount >= maxUses;
	};
};
