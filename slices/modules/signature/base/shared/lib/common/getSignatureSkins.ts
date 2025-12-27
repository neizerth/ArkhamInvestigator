import type { SignatureDetailItem as Item } from "@modules/signature/base/shared/model";
import type { InvestigatorSignatureGroup } from "arkham-investigator-data";
import { isNotNil, pick, prop, uniqBy } from "ramda";
import { getSignatureOptionName } from "./getSignatureOptionName";

export const getSignatureSkins = (group: InvestigatorSignatureGroup) => {
	const { code, faction_code } = group;

	const skins = group.signatures
		.map((item): Item | undefined => {
			if (!item.image.id) {
				return;
			}
			return {
				...pick(["id", "image", "code"], item),
				name: getSignatureOptionName(item),
				faction: faction_code,
				type: "skin",
				imageId: item.image.id,
				value: item.id,
			};
		})
		.filter(isNotNil);

	const uniqueSkins = uniqBy(prop("imageId"), skins);

	const additionalSkins = group.skins.map((skin): Item => {
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
