import type { PropsWithBoard } from "@modules/board/base/shared/model";
import type { InvestigatorAbility } from "arkham-investigator-data";
import { abilityModifications } from "../../config";

export type GetAbilityModificationOptions = PropsWithBoard & {
	ability: InvestigatorAbility;
};

export const getAbilityModification = (
	options: GetAbilityModificationOptions,
) => {
	const modificationCallback = abilityModifications[options.ability.id];

	if (!modificationCallback) {
		return options.ability;
	}

	return modificationCallback(options);
};
