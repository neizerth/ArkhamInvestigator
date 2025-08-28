import type { SignatureImageType } from "@modules/signature/base/shared/model";

export type SignatureImageCacheItem = {
	id: string;
	type: SignatureImageType;
	code: string;
	grayscale: boolean;
	uri: string;
};
