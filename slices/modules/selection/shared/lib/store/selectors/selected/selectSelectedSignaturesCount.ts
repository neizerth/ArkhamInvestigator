import { createSelector } from "@reduxjs/toolkit";
import { selectSelectedSignatures } from "../../selection";

type Result = Record<string, number>;

export const selectSelectedSignaturesCount = createSelector(
	[selectSelectedSignatures],
	(signatures): Result => {
		if (!signatures) {
			return {};
		}

		return signatures.reduce((acc, signature) => {
			acc[signature.code] ??= 0;
			acc[signature.code] += 1;
			return acc;
		}, {} as Result);
	},
);
