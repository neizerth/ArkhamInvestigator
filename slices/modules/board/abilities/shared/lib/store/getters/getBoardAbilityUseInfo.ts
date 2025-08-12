import { whereId } from "@shared/lib";
import type { InvestigatorBoardUsedAbility } from "../../../model";

type Options = {
	abilityId: string;
	usedAbilities?: InvestigatorBoardUsedAbility[];
};

export const getBoardAbilityUseInfo = ({
	abilityId,
	usedAbilities = [],
}: Options) => usedAbilities.find(whereId(abilityId));
