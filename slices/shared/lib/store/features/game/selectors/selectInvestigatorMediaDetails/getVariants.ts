import type {
	InvestigatorDetailItem,
	InvestigatorDetails,
} from "@shared/model";
import { getMediaVariantId } from "../../../../../features/game/media/getMediaVariantId";

export const getVariants = (details: InvestigatorDetails) => {
	const { media, alternate } = details;

	if (!media?.variants) {
		return [];
	}
	const { code, image } = media;

	const mainVariant: InvestigatorDetailItem = {
		id: code,
		imageId: code,
		image,
		name: media.variantName || details.story.name,
		type: "default",
		icon: details.story.icon,
		value: null,
		details: details,
	};

	const variants = media.variants.map((variant): InvestigatorDetailItem => {
		const { type, name, image } = variant;
		const id = getMediaVariantId(variant);

		const variantDetails =
			alternate.find(({ investigator }) => investigator.code === id) || details;

		const { story } = variantDetails;
		const icon = story.icon === "parallel" ? "cardicons-parallel" : story.icon;

		const imageId = "image" in variant ? id : code;
		const variantImage = image || media.image;

		return {
			id,
			value: id,
			imageId,
			image: variantImage,
			name,
			type,
			icon,
			details: variantDetails,
		};
	});

	return [mainVariant, ...variants];
};
