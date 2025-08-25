import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { isNumber } from "mathjs";
import { defultEffectModificationCallback } from "../../../lib/logic";
import type { InvestigatorTokenEffectModification as Modification } from "../../../model";

export const JimCulverBaseTokenEffects: Modification = {
	[InvesigatorCode.JimCulver.base]: (options) => {
		const { referenceCardEffects, tokenValues, board } = options;
		const effects = defultEffectModificationCallback(options);

		const skullValue = tokenValues.skull;
		if (!referenceCardEffects.skull || !isNumber(skullValue)) {
			return effects;
		}

		const lines = board.investigator.text.split("\n");
		const line = lines[1];

		const elderSignEffects = effects.elderSign
			? `${effects.elderSign}\n${line}`
			: line;

		return {
			...effects,
			elderSign: `${elderSignEffects}\n<i>[skull]: ${referenceCardEffects.skull}</i>`,
		};
	},
};
