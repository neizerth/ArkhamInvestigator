import type { ImageSizeType } from "@shared/model";
import { documentDirectory } from "expo-file-system";
import { HAVE_AVIF_SUPPORT } from "../config";

type GetInvestigatorImageUrlOptions = {
	code: string;
	type: ImageSizeType;
	grayscale?: boolean;
	version?: number;
};

export const getInvestigatorImageUrl = ({
	code,
	type,
	grayscale = false,
	version = 1,
}: GetInvestigatorImageUrlOptions) => {
	const colorType = grayscale ? "/grayscale" : "";
	const format = HAVE_AVIF_SUPPORT ? "avif" : "webp";
	const url = `${documentDirectory}images/${format}/${type}${colorType}/${code}.${format}`;
	return url;
};
