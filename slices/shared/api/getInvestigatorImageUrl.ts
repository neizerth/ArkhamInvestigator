import type { ImageSizeType } from "@shared/model";
import { INVESTIGATORS_API_URL } from "../config";

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
	const format = "jpg";
	const colorType = grayscale ? "/grayscale" : "";
	const url = `${INVESTIGATORS_API_URL}/images/${format}/${type}${colorType}/${code}.${format}?v=${version}`;
	return url;
};
