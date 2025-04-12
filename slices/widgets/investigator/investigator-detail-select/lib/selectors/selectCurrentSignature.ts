import { createSelector } from "@reduxjs/toolkit";
import {
	selectCurrentSignatureGroup,
	selectCurrentSignatureId,
} from "@shared/lib";
import { propEq } from "ramda";

export const selectCurrentSignature = createSelector(
	[selectCurrentSignatureGroup, selectCurrentSignatureId],
	(group, signatureId) => {
		if (!group) {
			return;
		}
		if (signatureId) {
			return group.signatures.find(propEq(signatureId, "id"));
		}
		return group.signatures[0];
	},
);
