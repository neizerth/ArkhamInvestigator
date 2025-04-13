import { getSignatureImageId } from "@shared/lib";
import type { InvestigatorDetailItem } from "@shared/model";
import type { InvestigatorSignatureGroup } from "arkham-investigator-data";
import { pick } from "ramda";

export const getSignatures = (group: InvestigatorSignatureGroup) => {
	const { code, faction_code } = group;
	return group.signatures.map((signature): InvestigatorDetailItem => {
		const imageId = getSignatureImageId(signature);

		const name =
			signature.taboo && signature.taboo_set
				? "Taboo Set"
				: signature.pack.name;

		return {
			...pick(["id", "image", "code", "type", "icon"], signature),
			name,
			faction: faction_code,
			code,
			imageId,
			value: signature.id,
		};
	});
};
