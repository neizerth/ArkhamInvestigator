import { createSelector } from "@reduxjs/toolkit";
import { prop } from "ramda";
import { selectSelectedSignatures } from "../../selection";

export const selectSelectedSignatureCodes = createSelector(
	[selectSelectedSignatures],
	(signatures) => {
		if (!signatures) {
			return [];
		}

		return signatures.map(prop("code"));
	},
);
