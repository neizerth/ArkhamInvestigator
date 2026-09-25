import type { DownloadQueueItem } from "@modules/core/assets/download-queue/shared/model";
import {
	type GetSignatureImageUrlOptions,
	getSignatureImageUrl as getUrl,
} from "@modules/signature/base/shared/api";
import { v4 } from "uuid";
import type { SignatureImageFile } from "./getSignatureImageFiles";

type CreateSingleItemOptions = Omit<GetSignatureImageUrlOptions, "remote">;

const createSingleItem = (
	options: CreateSingleItemOptions,
): DownloadQueueItem => {
	const url = getUrl({
		...options,
		pathType: "absolute",
	});
	const diskPath = getUrl({
		...options,
		pathType: "relative",
	});

	return {
		id: v4(),
		url,
		diskPath,
	};
};

const needGrayscale = false;

export const createDownloadQueueItems = ({
	baseUrl,
	...file
}: SignatureImageFile & { baseUrl: string }): DownloadQueueItem[] => {
	const baseImage = createSingleItem({
		...file,
		baseUrl,
	});

	if (!needGrayscale) {
		return [baseImage];
	}

	const grayscaleImage = createSingleItem({
		...file,
		grayscale: true,
		baseUrl,
	});

	return [baseImage, grayscaleImage];
};
