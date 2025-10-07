import type { InvestigatorAbilityValues } from "@modules/board/abilities/shared/model";
import type { InvestigatorSignature } from "arkham-investigator-data";

export const getSignatureAbilityValues = ({
	abilities = [],
}: InvestigatorSignature): InvestigatorAbilityValues => {
	const data = {} as InvestigatorAbilityValues;

	for (const ability of abilities) {
		if (ability.type === "counter") {
			data[ability.id] = ability.min || ability.defaultValue || 0;
		}
	}

	return data;
};
