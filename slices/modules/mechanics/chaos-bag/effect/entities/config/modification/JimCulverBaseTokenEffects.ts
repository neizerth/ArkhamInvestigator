import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { isNumber } from "mathjs";
import { replaceTokenEffectValue } from "../../../shared/lib";
import { defultEffectModificationCallback } from "../../lib/logic";
import type { InvestigatorTokenEffectModification as Modification } from "../../model";

export const JimCulverBaseTokenEffects: Modification = {
	[InvesigatorCode.JimCulver.base]: (options) => {
		const { referenceCardEffects, tokenValues } = options;
		const effects = defultEffectModificationCallback(options);

		const skullValue = tokenValues.skull;
		if (!referenceCardEffects.skull || !isNumber(skullValue)) {
			return effects;
		}

		const skullEffect = replaceTokenEffectValue({
			text: referenceCardEffects.skull,
			value: skullValue,
		});

		return {
			...effects,
			skull: `${effects.skull}\n<i>[skull]: ${skullEffect}</i>`,
			elderSign: `${effects.elderSign}\n<i>[skull]: ${referenceCardEffects.skull}</i>`,
		};
	},
};
