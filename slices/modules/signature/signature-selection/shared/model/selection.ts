import type { Faction } from "@modules/faction/shared/model";
import type { InvestigatorImage } from "@shared/model";
import type { InvestigatorSignature } from "arkham-investigator-data";

export type SelectedSignatureSkin = {
	id: string;
	image: InvestigatorSignature["image"];
};

export type SelectedSignature = {
	id: string;
	networkId?: string;
	code: string;
	signature: InvestigatorSignature;
	skin: SelectedSignatureSkin | null;
	image: InvestigatorImage;
	signatureGroupId: string;
};

export type FactionFilterType = Faction | "spoiler";
