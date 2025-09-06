import type { BoardId } from "@modules/board/base/shared/model";
import type { InvestigatorAbility } from "arkham-investigator-data";
import type { InvestigatorBoardUsedAbility } from "../../../model";

export type GetIsAbilityUsedOptions = {
	ability?: InvestigatorAbility;
	usedAbility?: InvestigatorBoardUsedAbility;
	targetBoardId?: BoardId;
	boardsCount: number;
};

export const getIsAbilityUsed = ({
	ability,
	usedAbility,
	targetBoardId,
	boardsCount,
}: GetIsAbilityUsedOptions) => {
	if (!usedAbility) {
		return false;
	}

	const boardIds = usedAbility.boardIds || [];

	if (!ability?.perInvestigator || boardIds.length === 0) {
		return true;
	}

	if (typeof targetBoardId === "number") {
		return boardIds.includes(targetBoardId);
	}

	const { personalUse } = ability;

	const maxUses = personalUse ? boardsCount : boardsCount - 1;
	const usesCount = boardIds.length;

	return usesCount >= maxUses;
};
