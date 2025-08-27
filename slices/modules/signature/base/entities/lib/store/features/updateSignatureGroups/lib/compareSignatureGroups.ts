import type { InvestigatorSignatureGroup as Group } from "arkham-investigator-data";
import { uniq } from "ramda";
import { compareSignatures } from "./compareSignatures";
import { compareSkins } from "./compareSkins";

export const compareSignatureGroups = (
	group1: Group[],
	group2: Group[],
): string[] => {
	const signatureIds = compareSignatures(group1, group2);
	const skinIds = compareSkins(group1, group2);

	const imageIds = [...signatureIds, ...skinIds];

	return uniq(imageIds);
};
