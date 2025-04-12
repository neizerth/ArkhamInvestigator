import type { InvestigatorDetailItem } from "@shared/model";
import type { InvestigatorSignatureGroup } from "arkham-investigator-data";
import { isNotNil, pick, prop, uniqBy } from "ramda";

export const getSkins = (group: InvestigatorSignatureGroup) => {
	const { code, faction_code } = group;

	const skins = group.signatures
		.map((item): InvestigatorDetailItem | undefined => {
			if (item.alternate_of_code) {
				return;
			}
			return {
				...pick(["id", "image", "code"], item),
				name: item.pack.name,
				faction: faction_code,
				type: "skin",
				imageId: item.code,
				value: item.id,
			};
		})
		.filter(isNotNil);

	const uniqueSkins = uniqBy(prop("imageId"), skins);

	const additionalSkins = group.skins.map((skin): InvestigatorDetailItem => {
		return {
			...skin,
			faction: faction_code,
			type: "skin",
			code,
			imageId: skin.id,
			value: skin.id,
		};
	});

	return [...uniqueSkins, ...additionalSkins];
};
