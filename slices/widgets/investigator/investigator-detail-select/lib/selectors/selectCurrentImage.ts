import { createSelector } from "@reduxjs/toolkit";
import { selectCurrentSignatureGroup } from "@shared/lib";
import { selectCurrentSignature } from "./selectCurrentSignature";
import { selectCurrentSkin } from "./selectCurrentSkin";

export const selectCurrentImage = createSelector(
	[selectCurrentSignatureGroup, selectCurrentSignature, selectCurrentSkin],
	(group, signature, skin) => {
		if (!group) {
			return null;
		}

		if (skin) {
			return {
				...skin.image,
				id: skin.id,
			};
		}

		const defaultSignature = group.signatures[0];

		const defaultImage = {
			...defaultSignature.image,
			id: defaultSignature.code,
		};

		if (!signature?.image || signature.alternate_of_code) {
			return defaultImage;
		}

		return {
			...signature.image,
			id: signature.id,
		};
	},
);
