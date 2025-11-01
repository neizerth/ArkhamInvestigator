import type { DownloadQueueItem } from "@modules/core/assets/download-queue/shared/model";
import {
	type GetSignatureImageUrlOptions,
	getSignatureImageUrl as getUrl,
} from "@modules/signature/base/shared/api";
import { v4 } from "uuid";

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

type CreateSingleItemTypesOptions = Omit<CreateSingleItemOptions, "type">;

const createSingleItemTypes = (options: CreateSingleItemTypesOptions) => {
	return [
		createSingleItem({
			...options,
			type: "full",
		}),
		createSingleItem({
			...options,
			type: "square",
		}),
	];
};

const needGrayscale = false;

export const createDownloadQueueItems = ({
	code,
	baseUrl,
}: { code: string; baseUrl: string }): DownloadQueueItem[] => {
	const baseImages = createSingleItemTypes({
		code,
		baseUrl,
	});

	if (!needGrayscale) {
		return baseImages;
	}

	const grayscaleImages = createSingleItemTypes({
		code,
		grayscale: true,
		baseUrl,
	});

	return [...baseImages, ...grayscaleImages];
};
