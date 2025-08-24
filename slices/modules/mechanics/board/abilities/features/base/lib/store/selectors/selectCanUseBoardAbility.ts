import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import type { AppSelector } from "@shared/model";
import { always } from "ramda";
import { InvestigatorAbilityChecker } from "../features";

type Options = PropsWithBoardId & {
	abilityId: string;
};

export const selectCanUseBoardAbility = ({
	abilityId,
	boardId,
}: Options): AppSelector<boolean> => {
	const validatorCreator = InvestigatorAbilityChecker[abilityId];

	if (!validatorCreator) {
		return always(true);
	}

	const validator = validatorCreator(boardId);

	return validator;
};
