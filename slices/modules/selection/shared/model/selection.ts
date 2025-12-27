import type { Faction } from "@shared/model";
import type { InvestigatorImage } from "@shared/model";

export type SelectedSignature = {
	id: string;
	type: "local" | "remote";
	signatureGroupId: string;
	code: string;
	image: InvestigatorImage;
	skin?: string;
};

export type FactionFilterType = Faction | "spoiler";
