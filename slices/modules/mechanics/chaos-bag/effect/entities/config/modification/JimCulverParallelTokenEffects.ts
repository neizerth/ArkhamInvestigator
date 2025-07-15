import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config";
import { isNumber } from "mathjs";
import { replaceXEffectValue } from "../../../shared/lib";
import { getDefultEffectModificationCallback } from "../../lib/logic";
import type { InvestigatorTokenEffectModification as Modification } from "../../model";

export const JimCulverParallelTokenEffects: Modification = {
	[InvesigatorCode.JimCulver.parallel]: (options) => {
		const { referenceCardEffects, defaultEffects, tokenValues } = options;
		const effects = getDefultEffectModificationCallback(options);
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

		const skullEffect = replaceXEffectValue({
			text: referenceCardEffects.skull,
			value: skullValue,
		});

		const elderSignEffects = [
			skull && `<i>[skull]: ${skullEffect}</i>`,
			curse && `<i>[curse]: ${curse}</i>`,
		].join("\n");

		return {
			...effects,
			curse: `[curse]: ${defaultEffects.curse}\n${effects.curse}`,
			elderSign: `${effects.elderSign}\n${elderSignEffects}`,
		};
	},
};
