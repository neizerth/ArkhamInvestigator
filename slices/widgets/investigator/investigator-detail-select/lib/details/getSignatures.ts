import { getSignatureImageId } from "@shared/lib";
import type { InvestigatorDetailItem } from "@shared/model";
import type { InvestigatorSignatureGroup } from "arkham-investigator-data";
import { pick } from "ramda";

export const getSignatures = (group: InvestigatorSignatureGroup) => {
	const { code, faction_code } = group;
	return group.signatures.map((signature): InvestigatorDetailItem => {
		const imageId = getSignatureImageId(signature);
		const icon = signature.pack.icon;

		return {
			...pick(["id", "image", "code", "type"], signature),
			name: signature.pack.name,
			faction: faction_code,
			icon,
			code,
			imageId,
			value: signature.id,
		};
	});
};
