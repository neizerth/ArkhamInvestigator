import type { DownloadQueueItem } from "@modules/core/assets/download-queue/shared/model";
import {
	type GetSignatureImageUrlOptions,
	getSignatureImageUrl as getUrl,
} from "@modules/signature/shared/lib";
import { Platform } from "react-native";
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
		pathType: "storage",
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

const needGrayscale = Platform.OS === "ios";

export const createDownloadQueueItems = (code: string): DownloadQueueItem[] => {
	const baseImages = createSingleItemTypes({
		code,
	});

	if (!needGrayscale) {
		return baseImages;
	}

	const grayscaleImages = createSingleItemTypes({
		code,
		grayscale: true,
	});

	return [...baseImages, ...grayscaleImages];
};
