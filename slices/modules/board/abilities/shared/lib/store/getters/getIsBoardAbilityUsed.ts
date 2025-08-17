import type { BoardId } from "@modules/board/base/shared/model";
import type { InvestigatorAbility } from "arkham-investigator-data";
import type { InvestigatorBoardUsedAbility } from "../../../model";

type Options = {
	ability?: InvestigatorAbility;
	usedAbility?: InvestigatorBoardUsedAbility;
	targetBoardId?: BoardId;
	boardsCount: number;
};

export const getIsBoardAbilityUsed = ({
	ability,
	usedAbility,
	targetBoardId,
	boardsCount,
}: Options) => {
	if (!usedAbility) {
		return false;
	}

	if (!ability?.perInvestigator || !usedAbility.boardIds) {
		return true;
	}

	if (typeof targetBoardId === "number") {
		return usedAbility.boardIds.includes(targetBoardId);
	}

	const { personalUse } = ability;

	const maxUses = personalUse ? boardsCount : boardsCount - 1;
	const usesCount = usedAbility.boardIds.length;
	return usesCount >= maxUses;
};
