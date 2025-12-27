import type { Faction } from "@shared/model";

export type SelectedSignature = {
	id: string;
	type: "local" | "remote";
	signatureGroupId: string;
	code: string;
	image: string;
	skin?: string;
};

export type FactionFilterType = Faction | "spoiler";
