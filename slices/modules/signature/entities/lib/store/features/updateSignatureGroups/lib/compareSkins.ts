import { getSkinId } from "@modules/signature/shared/lib";
import type {
	InvestigatorSignatureGroup as Group,
	InvestigatorSkin,
} from "arkham-investigator-data";
import { indexBy, prop } from "ramda";

export const compareSkins = (group1: Group[], group2: Group[]) => {
	const skins1 = group1.flatMap(prop("skins"));
	const skins2 = group2.flatMap(prop("skins"));

	const indexSkins = indexBy<InvestigatorSkin>(getSkinId);

	const oldSkinMap = indexSkins(skins1);

	const changedSkins = skins2.filter((skin) => {
		const id = getSkinId(skin);

		const old = oldSkinMap[id];

		if (!old) {
			return true;
		}

		return skin.image.version !== old.image.version;
	});

	const addedSkins = skins2.filter(({ id }) => {
		const old = oldSkinMap[id];

		return !old;
	});

	return [...changedSkins, ...addedSkins].map(getSkinId);
};
