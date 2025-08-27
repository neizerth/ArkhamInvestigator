import type { InvestigatorSkin } from "arkham-investigator-data";

export const getSkinId = (skin: InvestigatorSkin) => skin.image.id || skin.id;
