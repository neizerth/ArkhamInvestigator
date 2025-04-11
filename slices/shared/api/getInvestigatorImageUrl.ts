import type { ImageSizeType } from "@shared/model";
import { INVESTIGATORS_API_URL } from "../config";
import { APP_VERSION } from "../config/app";

type GetInvestigatorImageUrlOptions = {
	code: string;
	type: ImageSizeType;
	qs?: string;
};
export const getInvestigatorImageUrl = ({
	code,
	type,
	qs = `v=${APP_VERSION}`,
}: GetInvestigatorImageUrlOptions) => {
	const format = "jpg";
	const url = `${INVESTIGATORS_API_URL}/images/${format}/${type}/${code}.${format}?${qs}`;
	return url;
};
