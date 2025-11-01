import { ASSET_URL, HAVE_AVIF_SUPPORT } from "@shared/config";
import { documentDirectory } from "expo-file-system";
import type { SignatureImageType } from "../model";

export type GetSignatureImageUrlOptions = {
	code: string;
	type: SignatureImageType;
	grayscale?: boolean;
	pathType?: "storage" | "absolute" | "relative";
	baseUrl?: string;
};

export const getSignatureImageUrl = ({
	code,
	type,
	grayscale = false,
	pathType = "storage",
	baseUrl = ASSET_URL,
}: GetSignatureImageUrlOptions) => {
	const colorType = grayscale ? "/grayscale" : "";
	const format = HAVE_AVIF_SUPPORT ? "avif" : "webp";
	const path = `images/${format}/${type}${colorType}/${code}.${format}`;

	if (pathType === "absolute") {
		return `${baseUrl}/${path}`;
	}
	if (pathType === "storage") {
		return `${documentDirectory}${path}`;
	}
	return path;
};
