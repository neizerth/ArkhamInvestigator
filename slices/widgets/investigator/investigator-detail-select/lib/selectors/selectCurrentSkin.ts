import { createSelector } from "@reduxjs/toolkit";
import { selectCurrentSignatureGroup, selectCurrentSkinId } from "@shared/lib";
import { whereId } from "@shared/lib/util";
import { getSkins } from "../details";

export const selectCurrentSkin = createSelector(
	[selectCurrentSignatureGroup, selectCurrentSkinId],
	(group, skinId) => {
		if (!group || !skinId) {
			return null;
		}

		const skins = getSkins(group);

		return skins.find(whereId(skinId)) || null;
	},
);
