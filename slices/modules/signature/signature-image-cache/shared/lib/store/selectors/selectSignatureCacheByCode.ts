import type { SignatureImageType } from "@modules/signature/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { selectAllSignatureCache } from "../signatureImageCache";

type Options = {
	code: string;
	type: SignatureImageType;
	grayscale?: boolean;
};

export const selectSignatureCacheByCode = ({
	code,
	type,
	grayscale = false,
}: Options) =>
	createSelector([selectAllSignatureCache], (data) =>
		data.find(
			(item) =>
				item.grayscale === grayscale &&
				item.code === code &&
				item.type === type,
		),
	);
