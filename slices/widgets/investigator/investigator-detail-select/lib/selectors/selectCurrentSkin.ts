import { createSelector } from "@reduxjs/toolkit";
import { selectCurrentSignatureGroup, selectCurrentSkinId } from "@shared/lib";
import { propEq } from "ramda";
import { getSkins } from "../details";

export const selectCurrentSkin = createSelector(
	[selectCurrentSignatureGroup, selectCurrentSkinId],
	(group, skinId) => {
		if (!group || !skinId) {
			return null;
		}

		const skins = getSkins(group);

		return skins.find(propEq(skinId, "id")) || null;
	},
);
