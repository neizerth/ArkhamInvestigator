import type { Faction } from "@shared/model/features";

export type ArkhamDBInvestigatorCard = {
	code: string;
	flavor: string;
	name: string;
	subname: string;
	text: string;
	traits: string;
	faction_code: Faction;
};
