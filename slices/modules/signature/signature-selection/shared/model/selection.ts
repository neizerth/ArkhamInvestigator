import type { Faction } from "@shared/model";
import type { InvestigatorImage } from "@shared/model";
import type { InvestigatorSignature } from "arkham-investigator-data";

export type SelectedSignatureSkin = {
	id: string;
	image: InvestigatorSignature["image"];
};

export type SelectedSignature = {
	id: string;
	remote?: boolean;
	code: string;
	signature: InvestigatorSignature;
	skin: SelectedSignatureSkin | null;
	image: InvestigatorImage;
	signatureGroupId: string;
};

export type FactionFilterType = Faction | "spoiler";
