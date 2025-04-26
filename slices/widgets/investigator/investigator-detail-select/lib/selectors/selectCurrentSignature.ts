import { createSelector } from "@reduxjs/toolkit";
import {
	selectCurrentSignatureGroup,
	selectCurrentSignatureId,
	whereId,
} from "@shared/lib";

export const selectCurrentSignature = createSelector(
	[selectCurrentSignatureGroup, selectCurrentSignatureId],
	(group, signatureId) => {
		if (!group) {
			return;
		}
		if (signatureId) {
			return group.signatures.find(whereId(signatureId));
		}
		return group.signatures[0];
	},
);
