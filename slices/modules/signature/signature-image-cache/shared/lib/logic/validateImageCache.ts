import { getSignatureImageLayout } from "@modules/signature/base/shared/lib";
import type { Box } from "@shared/model";
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

const imagesEquals = (aI?: Image, bI?: Image) => {
	if (!aI || !bI) {
		return false;
	}
	if (aI.version !== bI.version) {
		return false;
	}

	const a = pick(["width", "height"], aI);
	const b = pick(["width", "height"], bI);

	return equalRounded(a, b);
};

export const validateImageCache = ({ cache, data }: Options) => {
	if (!cache) {
		return false;
	}
	const { crop } = getSignatureImageLayout(data);

	if (!equalRounded(cache.offset, data.offset)) {
		console.log("offset changes", cache.offset, data.offset);
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
