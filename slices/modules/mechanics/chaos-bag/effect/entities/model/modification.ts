import type { ReferencePart } from "arkham-investigator-data";

export type InvestigatorReferenceModificationCallbackOptions = {
	reference: ReferencePart[];
};

export type InvestigatorReferenceModificationCallback = (
	options: InvestigatorReferenceModificationCallbackOptions,
) => ReferencePart[];

export type InvestigatorReferenceModification = Record<
	string,
	InvestigatorReferenceModificationCallback
>;
