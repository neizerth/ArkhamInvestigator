import type { InvestigatorBoardImage } from "@modules/board/base/shared/model";
import type {
	SignatureImageLayout,
	SignatureImageType,
} from "@modules/signature/base/shared/model";
import { createAction } from "@reduxjs/toolkit";
import type { Box } from "arkham-investigator-data";

export type CreateSignatureCachePayload = {
	image: InvestigatorBoardImage;
	view: Box;
	type: SignatureImageType;
	grayscale?: boolean;
	layout: SignatureImageLayout;
	overwrite?: boolean;
};

export const createSignatureCache = createAction<CreateSignatureCachePayload>(
	"signatureImageCache/create",
);

export type SignatureCacheCreatedPayload = CreateSignatureCachePayload & {
	uri: string;
};

export const signatureCacheCreated = createAction<SignatureCacheCreatedPayload>(
	"signatureImageCache/create",
);
