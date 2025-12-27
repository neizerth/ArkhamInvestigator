import { getSignatureSkins } from "@modules/signature/base/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { selectCurrentSignatureGroup, selectCurrentSkinId } from "@shared/lib";
import { whereId } from "@shared/lib/util";

export const selectCurrentSkin = createSelector(
	[selectCurrentSignatureGroup, selectCurrentSkinId],
	(group, skinId) => {
		if (!group) {
			return null;
		}

		const skins = getSignatureSkins(group);

		if (!skinId) {
			return skins[0];
		}

		return skins.find(whereId(skinId)) || skins[0] || null;
	},
);
