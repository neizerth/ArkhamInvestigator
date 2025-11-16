import type { Faction } from "@modules/faction/shared/model";
import type { Defined } from "@shared/model";
import type { InvestigatorSignature } from "arkham-investigator-data";

type Image = Defined<InvestigatorSignature["image"]>;

export type SignatureDetailItem<Data = unknown> = {
	id: string;
	code: string;
	imageId: string;
	image: Image;
	faction: Faction;
	type: InvestigatorSignature["type"] | "skin";
	icon?: string;
	name: string;
	value: string | null;
	data?: Data;
};
