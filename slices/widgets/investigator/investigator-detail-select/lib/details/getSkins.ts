import type { InvestigatorDetailItem } from "@shared/model";
import type { InvestigatorSignatureGroup } from "arkham-investigator-data";
import { isNotNil, pick, prop, uniqBy } from "ramda";

export const getSkins = (group: InvestigatorSignatureGroup) => {
	const { code, faction_code } = group;

	const skins = group.signatures
		.map((item): InvestigatorDetailItem | undefined => {
			if (!item.image.id) {
				return;
			}
			return {
				...pick(["id", "image", "code"], item),
				name: item.pack.name,
				faction: faction_code,
				type: "skin",
				imageId: item.image.id,
				value: item.id,
			};
		})
		.filter(isNotNil);

	const uniqueSkins = uniqBy(prop("imageId"), skins);

	const additionalSkins = group.skins.map((skin): InvestigatorDetailItem => {
		const imageId = skin.image.id || skin.id;
		const image = {
			...skin.image,
			id: imageId,
		};
		return {
			...skin,
			faction: faction_code,
			image,
			type: "skin",
			code,
			imageId,
			value: skin.id,
		};
	});

	return [...uniqueSkins, ...additionalSkins];
};
