import type { InvestigatorBoardUsedAbility } from "@modules/board/abilities/shared/model";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { prop } from "ramda";

const effects = Object.values(AbilityCode.RichardCarlisle.effects);

export const getUnusedEffects = (
	usedAbilities: InvestigatorBoardUsedAbility[] = [],
) => {
	const usedIds = usedAbilities.map(prop("id"));
	return effects.filter((id) => !usedIds.includes(id));
};
