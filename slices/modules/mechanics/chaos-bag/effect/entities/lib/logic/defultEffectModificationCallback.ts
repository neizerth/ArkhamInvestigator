import {
	mergeTokenEffects,
	replaceTokenEffectsValues,
} from "../../../shared/lib";
import type { InvestigatorTokenEffectModificationCallback } from "../../model";

export const defultEffectModificationCallback: InvestigatorTokenEffectModificationCallback =
	(options) => {
		const { defaultEffects, tokenValues } = options;
		const referenceEffects = replaceTokenEffectsValues({
			tokenEffects: options.referenceCardEffects,
			tokenValues,
		});

		const signatureEffects = replaceTokenEffectsValues({
			tokenEffects: options.signatureEffects,
			tokenValues,
		});

		const effects = mergeTokenEffects(
			mergeTokenEffects(defaultEffects, referenceEffects),
			signatureEffects,
		);

		return effects;
	};
