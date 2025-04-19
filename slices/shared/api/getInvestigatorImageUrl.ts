import type { ImageSizeType } from "@shared/model";
import { INVESTIGATORS_API_URL } from "../config";
import { APP_VERSION } from "../config/app";

type GetInvestigatorImageUrlOptions = {
	code: string;
	type: ImageSizeType;
	grayscale?: boolean;
	qs?: string;
};
export const getInvestigatorImageUrl = ({
	code,
	type,
	grayscale = false,
	qs = `v=${APP_VERSION}`,
}: GetInvestigatorImageUrlOptions) => {
	const format = "jpg";
	const colorType = grayscale ? "/grayscale" : "";
	const url = `${INVESTIGATORS_API_URL}/images/${format}/${type}${colorType}/${code}.${format}?${qs}`;
	return url;
};
