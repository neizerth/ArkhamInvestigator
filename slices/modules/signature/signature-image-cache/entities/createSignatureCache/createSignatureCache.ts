import type { InvestigatorBoardImage } from "@modules/board/base/shared/model";
import type { SignatureImageType } from "@modules/signature/base/shared/model";
import { createAction } from "@reduxjs/toolkit";
import type { Box, RectPosition } from "@shared/model";

export type CreateSignatureCachePayload = {
	image: InvestigatorBoardImage;
	view: Box;
	offset: RectPosition;
	type: SignatureImageType;
	grayscale?: boolean;
};

export const createSignatureCache = createAction<CreateSignatureCachePayload>(
	"signatureImageCache/create",
);

export type SignatureCacheCreatedPayload = CreateSignatureCachePayload & {
	uri: string;
};

export const signatureCacheCreated = createAction<SignatureCacheCreatedPayload>(
	"signatureImageCache/created",
);
