import type { SignatureDetailItem as Item } from "@modules/signature/base/shared/model";
import type { InvestigatorSignatureGroup } from "arkham-investigator-data";
import { pick } from "ramda";
import { getSignatureOptionName } from "./getSignatureOptionName";

export const getSignatures = (group: InvestigatorSignatureGroup) => {
	const { code, faction_code } = group;
	return group.signatures
		.filter(({ type }) => type !== "book")
		.map((signature): Item => {
			const name = getSignatureOptionName(signature);

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
