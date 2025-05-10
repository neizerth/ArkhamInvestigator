import type { InvestigatorDetailItem } from "@shared/model";
import type {
	InvestigatorSignature,
	InvestigatorSignatureGroup,
} from "arkham-investigator-data";
import { pick } from "ramda";

export const getSignatures = (group: InvestigatorSignatureGroup) => {
	const { code, faction_code } = group;
	return group.signatures.map((signature): InvestigatorDetailItem => {
		const name = getSignatureName(signature);

		return {
			...pick(["id", "image", "code", "type", "icon"], signature),
			name,
			faction: faction_code,
			code,
			imageId: signature.image.id,
			value: signature.id,
		};
	});
};

const getSignatureName = (signature: InvestigatorSignature) => {
	if (signature.taboo && signature.taboo_set) {
		return "Taboo Set";
	}
	if (!signature.official) {
		return signature.pack.name;
	}
	return signature.cycle.name;
};
