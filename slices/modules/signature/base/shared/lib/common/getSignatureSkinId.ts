import type { InvestigatorSkin } from "arkham-investigator-data";

export const getSignatureSkinId = (skin: InvestigatorSkin) =>
	skin.image.id ?? skin.id;
