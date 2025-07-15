import type { InvestigatorTokenEffectModificationCallback } from "../../model";

export const getDefultEffectModificationCallback: InvestigatorTokenEffectModificationCallback =
	({ referenceCardEffects, signatureEffects, defaultEffects }) => ({
		...defaultEffects,
		...referenceCardEffects,
		...signatureEffects,
	});
