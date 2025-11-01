import type { Faction } from "@modules/faction/shared/model";
import type { InvestigatorSignature } from "arkham-investigator-data";

export type SignatureDetailItem<Data = unknown> = {
	id: string;
	code: string;
	imageId: string;
	image: InvestigatorSignature["image"];
	faction: Faction;
	type: InvestigatorSignature["type"] | "skin";
	icon?: string;
	name: string;
	value: string | null;
	data?: Data;
};
