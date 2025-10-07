import type { InvestigatorDetailItem } from "@shared/model";
import type { InvestigatorSignatureGroup } from "arkham-investigator-data";
import { pick } from "ramda";
import { getOptionName } from "./getOptionName";

export const getSignatures = (group: InvestigatorSignatureGroup) => {
	const { code, faction_code } = group;
	return group.signatures
		.filter(({ type }) => type !== "book")
		.map((signature): InvestigatorDetailItem => {
			const name = getOptionName(signature);

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
