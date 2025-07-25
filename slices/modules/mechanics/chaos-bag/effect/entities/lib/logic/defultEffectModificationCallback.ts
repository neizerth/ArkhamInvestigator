import {
	mergeTokenEffects,
	replaceTokenEffectsValues,
} from "../../../shared/lib";
import type { InvestigatorTokenEffectModificationCallback } from "../../model";

export const defultEffectModificationCallback: InvestigatorTokenEffectModificationCallback =
	({ referenceCardEffects, signatureEffects, defaultEffects, tokenValues }) => {
		const referenceEffects = replaceTokenEffectsValues({
			tokenEffects: referenceCardEffects,
			tokenValues,
		});

		const effects = mergeTokenEffects(
			mergeTokenEffects(defaultEffects, referenceEffects),
			signatureEffects,
		);

		return effects;
	};
