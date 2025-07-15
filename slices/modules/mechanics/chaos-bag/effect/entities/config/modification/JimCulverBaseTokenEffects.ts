import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { isNumber } from "mathjs";
import { replaceXEffectValue } from "../../../shared/lib";
import { getDefultEffectModificationCallback } from "../../lib/logic";
import type { InvestigatorTokenEffectModification as Modification } from "../../model";

export const JimCulverBaseTokenEffects: Modification = {
	[InvesigatorCode.JimCulver.base]: (options) => {
		const { referenceCardEffects, tokenValues } = options;
		const effects = getDefultEffectModificationCallback(options);

		const skullValue = tokenValues.skull;
		if (!referenceCardEffects.skull || !isNumber(skullValue)) {
			return effects;
		}

		const effect = replaceXEffectValue({
			text: referenceCardEffects.skull,
			value: skullValue,
		});

		return {
			...effects,
			elderSign: `${effects.elderSign}\n<i>[skull]: ${effect}</i>`,
		};
	},
};
