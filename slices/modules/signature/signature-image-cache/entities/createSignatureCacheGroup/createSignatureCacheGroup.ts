import { createAction } from "@reduxjs/toolkit";
import type { CreateSignatureCachePayload } from "../createSignatureCache/createSignatureCache";

export const createSignatureCacheGroup =
	createAction<CreateSignatureCachePayload>("signatureImagecache/createGroup");

export type SignatureCacheGroupCreated = CreateSignatureCachePayload & {
	background: {
		color: string;
		grayscale: string;
	};
};

export const signatureCacheGroupCreated =
	createAction<SignatureCacheGroupCreated>("signatureImagecache/groupCreated");
