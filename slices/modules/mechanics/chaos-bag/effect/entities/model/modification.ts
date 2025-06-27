import type { ReferencePart } from "arkham-investigator-data";

export type InvestigatorTokenEffectModificationCallbackOptions = {
	reference: ReferencePart[];
};

export type InvestigatorTokenEffectModificationCallback = (
	options: InvestigatorTokenEffectModificationCallbackOptions,
) => ReferencePart[];

export type InvestigatorTokenEffectModification = Record<
	string,
	InvestigatorTokenEffectModificationCallback
>;
