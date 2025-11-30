import { getSignatureImageLayout } from "@modules/signature/base/shared/lib";
import type { Box, ReturnAwaited } from "@shared/model";
import * as FileSystem from "expo-file-system";
import { equals, map, pick } from "ramda";
import type { SignatureImageCacheItem } from "../../model";

type Options = {
	cache?: SignatureImageCacheItem;
	data: Pick<SignatureImageCacheItem, "image" | "offset"> & {
		view: Box;
	};
};

type Image = SignatureImageCacheItem["image"];

const round = map(Math.round);

const equalRounded = <T extends Record<string, number>>(a?: T, b?: T) =>
	a && b && equals(round(a), round(b));

const sizeProps = ["width", "height"] as const;

const imagesEquals = (aI?: Image, bI?: Image) => {
	if (!aI || !bI) {
		return false;
	}
	if (aI.version !== bI.version) {
		return false;
	}

	const a = pick(sizeProps, aI);
	const b = pick(sizeProps, bI);

	return equalRounded(a, b);
};

export const validateImageCache = async ({ cache, data }: Options) => {
	if (!cache) {
		return false;
	}

	const { exists }: ReturnAwaited<typeof FileSystem.getInfoAsync> =
		await FileSystem.getInfoAsync(cache.uri);

	if (!exists) {
		return false;
	}

	const layout = getSignatureImageLayout(data);

	if (!layout) {
		return false;
	}

	const { crop } = layout;

	if (!equalRounded(cache.offset, data.offset)) {
		return false;
	}

	if (!equalRounded(crop, cache.crop)) {
		return false;
	}

	if (!imagesEquals(data.image, cache.image)) {
		return false;
	}

	return true;
};
