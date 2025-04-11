import type { ArkhamDBInvestigatorCard } from "@shared/model/api/game/arkhamDB";
import type { InvestigatorSignature } from "arkham-investigator-data";
import { omit, propEq } from "ramda";

export const translateInvestigator = (
	investigator: InvestigatorSignature,
	translations: ArkhamDBInvestigatorCard[],
) => {
	const translation = translations.find(propEq(investigator.code, "code"));

	if (!translation) {
		return {
			...investigator,
			translated: [],
		};
	}
	const keys = Object.keys(translation) as (keyof ArkhamDBInvestigatorCard)[];
	const translated = keys.filter((key) =>
		key in investigator ? investigator[key] !== translation[key] : false,
	);
	return {
		...investigator,
		...omit(["code", "faction_code"], translation),
		translated,
	};
};
