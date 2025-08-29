import type { SignatureImageType } from "@modules/signature/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { propEq } from "ramda";
import { selectAllSignatureCache } from "../signatureImageCache";

type Options = {
	code: string;
	type: SignatureImageType;
};

export const selectSignatureCacheGroupByCode = ({ code, type }: Options) =>
	createSelector([selectAllSignatureCache], (data) => {
		const cached = data.filter(propEq(code, "code"));
		const color = cached.find((item) => !item.grayscale);
		const grayscale = cached.find((item) => item.grayscale);

		if (!color) {
			return;
		}

		return {
			color,
			grayscale: grayscale ?? color,
		};
	});
