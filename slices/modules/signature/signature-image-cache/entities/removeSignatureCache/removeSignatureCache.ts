import { createAction } from "@reduxjs/toolkit";

export type RemoveSignatureCachePayload = {
	code: string;
};

export const removeSignatureCache = createAction("signatureImageCache/remove");
