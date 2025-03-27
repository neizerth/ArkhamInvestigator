import { INVESTIGATORS_API_URL } from "@shared/config";
import { APP_VERSION } from "@shared/config/app";
import type { ImageSizeType } from "@shared/model";

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
