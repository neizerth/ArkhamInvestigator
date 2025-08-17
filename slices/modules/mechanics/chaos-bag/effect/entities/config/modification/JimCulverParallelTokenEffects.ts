import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { isNumber } from "mathjs";
import { replaceTokenEffectValue } from "../../../shared/lib";
import { defultEffectModificationCallback } from "../../lib/logic";
import type { InvestigatorTokenEffectModification as Modification } from "../../model";

export const JimCulverParallelTokenEffects: Modification = {
	[InvesigatorCode.JimCulver.parallel]: (options) => {
		const { referenceCardEffects, defaultEffects, tokenValues } = options;
		const effects = defultEffectModificationCallback(options);
		const { skull } = referenceCardEffects;
		const { curse } = defaultEffects;

		const skullValue = tokenValues.skull;
		if (
			!skull ||
			!curse ||
			!isNumber(skullValue) ||
			!referenceCardEffects.skull
		) {
			return effects;
		}

		const skullEffect = replaceTokenEffectValue({
			text: referenceCardEffects.skull,
			value: skullValue,
		});

		const elderSignEffects = [
			`<i>[skull]: ${skullEffect}</i>`,
			`<i>[curse]: ${curse}</i>`,
		].join("\n");

		return {
			...effects,
			curse: `[curse]: ${effects.curse}`,
			elderSign: `${effects.elderSign}\n${elderSignEffects}`,
		};
	},
};
