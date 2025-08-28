import { createAction } from "@reduxjs/toolkit";
import type { CreateSignatureCachePayload } from "../createSignatureCache/createSignatureCache";

export const createSignatureCacheGroup =
	createAction<CreateSignatureCachePayload>("signatureImagecache/createGroup");

export const signatureCacheGroupCreated =
	createAction<CreateSignatureCachePayload>("signatureImagecache/groupCreated");
