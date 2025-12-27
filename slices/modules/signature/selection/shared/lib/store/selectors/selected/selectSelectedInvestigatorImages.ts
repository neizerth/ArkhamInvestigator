import { createSelector } from "@reduxjs/toolkit";
import { selectSelectedSignatures } from "../../signatureSelection";

export const selectSelectedSignatureImages = createSelector(
	[selectSelectedSignatures],
	(signatures) => {
		if (!signatures) {
			return {};
		}

		return signatures.reduce(
			(acc, signature) => {
				acc[signature.code] = signature.image.id;
				return acc;
			},
			{} as Record<string, string>,
		);
	},
);
