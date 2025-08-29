import type { InvestigatorBoardImage } from "@modules/board/base/shared/model";
import type { SignatureImageType } from "@modules/signature/base/shared/model";
import type { BoxLayout, RectPosition } from "@shared/model";

export type SignatureImageCacheItem = {
	id: string;
	image: InvestigatorBoardImage;
	type: SignatureImageType;
	code: string;
	grayscale: boolean;
	src: string;
	uri: string;
	crop: BoxLayout;
	offset: RectPosition;
};
