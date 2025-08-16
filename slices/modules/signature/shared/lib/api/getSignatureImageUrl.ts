import { HAVE_AVIF_SUPPORT } from "@shared/config";
import { documentDirectory } from "expo-file-system";

export type GetSignatureImageUrlOptions = {
	code: string;
	type: "full" | "square";
	grayscale?: boolean;
	relative?: boolean;
};

export const getSignatureImageUrl = ({
	code,
	type,
	grayscale = false,
	relative = false,
}: GetSignatureImageUrlOptions) => {
	const colorType = grayscale ? "/grayscale" : "";
	const format = HAVE_AVIF_SUPPORT ? "avif" : "webp";
	const path = `images/${format}/${type}${colorType}/${code}.${format}`;

	if (relative) {
		return path;
	}
	return `${documentDirectory}${path}`;
};
