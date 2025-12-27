import { createSelector } from "@reduxjs/toolkit";
import { propEq } from "ramda";
import { selectSelectedSignatures } from "../../signatureSelection";

export const selectSelectedSignatureByCode = (code: string) =>
	createSelector([selectSelectedSignatures], (signatures) =>
		signatures?.find(propEq(code, "code")),
	);
