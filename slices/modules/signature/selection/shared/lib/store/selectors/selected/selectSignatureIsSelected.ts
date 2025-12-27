import { createSelector } from "@reduxjs/toolkit";
import { propEq } from "ramda";
import { selectSelectedSignatures } from "../../signatureSelection";

export const selectSignatureIsSelected = (code: string) =>
	createSelector([selectSelectedSignatures], (signatures) => {
		if (!signatures) {
			return false;
		}

		return signatures.some(propEq(code, "code"));
	});
