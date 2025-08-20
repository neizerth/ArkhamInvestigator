import type { PropsWithBoard } from "@modules/board/base/shared/model";
import { whereId } from "@shared/lib";
import { getInvestigatorBoardAbilities } from "./getInvestigatorBoardAbilities";
import {
	type GetIsAbilityUsedOptions,
	getIsAbilityUsed,
} from "./getIsAbilityUsed";

type Options = Omit<GetIsAbilityUsedOptions, "ability" | "usedAbility"> &
	PropsWithBoard & {
		abilityId: string;
	};

export const getIsBoardAbilityUsed = (options: Options) => {
	const { board, boardsCount, abilityId } = options;
	const { investigator, usedAbilities = [] } = board;
	const abilities = getInvestigatorBoardAbilities({
		investigator,
		investigatorsCount: boardsCount,
	});

	const ability = abilities.find(whereId(abilityId));

	const usedAbility = usedAbilities.find(whereId(abilityId));

	return getIsAbilityUsed({
		ability,
		usedAbility,
		...options,
	});
};
