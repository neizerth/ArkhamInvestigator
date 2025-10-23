import { HAVE_AVIF_SUPPORT } from "@shared/config";

export const getArtworkImagesArchiveUrl = (baseUrl: string) => {
	const name = HAVE_AVIF_SUPPORT ? "avif" : "webp";
	return `${baseUrl}/images/${name}.color.zip`;
};
