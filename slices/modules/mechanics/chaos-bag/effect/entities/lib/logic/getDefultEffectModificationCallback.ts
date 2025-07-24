import { replaceTokenEffectsValues } from "../../../shared/lib";
import type { InvestigatorTokenEffectModificationCallback } from "../../model";

export const getDefultEffectModificationCallback: InvestigatorTokenEffectModificationCallback =
	({ referenceCardEffects, signatureEffects, defaultEffects, tokenValues }) => {
		const referenceEffects = replaceTokenEffectsValues({
			tokenEffects: referenceCardEffects,
			tokenValues,
		});

		const effects = {
			...defaultEffects,
			...referenceEffects,
			...signatureEffects,
		};

		return effects;
	};
