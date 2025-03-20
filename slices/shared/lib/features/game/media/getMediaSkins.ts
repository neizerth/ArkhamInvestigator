import type {
	InvestigatorDetailItem,
	InvestigatorDetails,
} from "@shared/model";
import { isNotNil } from "ramda";

export const getMediaSkins = (details: InvestigatorDetails) => {
	const { media, story, investigator } = details;

	if (!media) {
		return [];
	}

	const { variants = [], skins = [], image } = media;
	const { code } = media;

	const defaultSkin: InvestigatorDetailItem = {
		id: investigator.code,
		imageId: investigator.code,
		image,
		name: story.name,
		type: "skin",
		value: code,
		details,
	};

	const data = skins.map((skin): InvestigatorDetailItem => {
		const { id, name, image } = skin;

		return {
			id,
			imageId: id,
			image,
			value: id,
			name,
			type: "skin",
			details,
		};
	});

	const variantSkins = variants
		.map((variant): InvestigatorDetailItem | null => {
			if (!("image" in variant)) {
				return null;
			}
			const id = "code" in variant ? variant.code : code;
			const { name, image } = variant;

			return {
				id,
				imageId: id,
				image: image || media.image,
				value: id,
				name,
				type: "skin",
				details,
			};
		})
		.filter(isNotNil);

	return [defaultSkin, ...data, ...variantSkins];
};
