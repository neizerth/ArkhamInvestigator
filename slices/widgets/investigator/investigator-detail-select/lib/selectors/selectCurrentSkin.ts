import { selectCurrentSignatureGroup, selectCurrentSkinId } from "@shared/lib";
import { whereId } from "@shared/lib/util";
import type { RootState } from "@shared/model";
import { getSkins } from "../details";

export const selectCurrentSkin = (state: RootState) => {
	const group = selectCurrentSignatureGroup(state);
	const skinId = selectCurrentSkinId(state);
	if (!group || !skinId) {
		return null;
	}
	const skins = getSkins(group);
	return skins.find(whereId(skinId)) || null;
};
