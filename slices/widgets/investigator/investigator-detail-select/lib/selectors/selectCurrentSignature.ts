import { createSelector } from "@reduxjs/toolkit";
import {
	selectCurrentSignatureGroup,
	selectCurrentSignatureId,
} from "@shared/lib";
import { whereId } from "@shared/lib/util";

export const selectCurrentSignature = createSelector(
	[selectCurrentSignatureGroup, selectCurrentSignatureId],
	(group, signatureId) => {
		if (!group?.signatures?.length) {
			return;
		}

		const [defaultSignature] = group.signatures;

		if (!signatureId) {
			return defaultSignature;
		}

		const signature = group.signatures.find(whereId(signatureId));

		return signature ?? defaultSignature;
	},
);
