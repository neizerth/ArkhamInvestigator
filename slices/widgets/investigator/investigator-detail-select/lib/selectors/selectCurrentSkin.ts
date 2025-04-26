import { createSelector } from "@reduxjs/toolkit";
import {
	selectCurrentSignatureGroup,
	selectCurrentSkinId,
	whereId,
} from "@shared/lib";
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
