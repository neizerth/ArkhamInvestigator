import { createSelector } from "@reduxjs/toolkit";
import {
	selectCurrentSignatureGroup,
	selectCurrentSignatureId,
} from "@shared/lib";
import { whereId } from "@shared/lib/util";

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
