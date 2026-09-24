import type { InvestigatorImage } from "@shared/model";
import type { InvestigatorSignature } from "arkham-investigator-data";
import type { ImageRequireSource } from "react-native";

export type Faction =
	| "neutral"
	| "mystic"
	| "rogue"
	| "survivor"
	| "seeker"
	| "guardian";

export type FactionImages = Record<Faction, ImageRequireSource>;

export type InvestigatorSkillType =
	| "willpower"
	| "intellect"
	| "combat"
	| "agility";

export type InvestigatorMainStatType = "health" | "sanity";

/** doom, clues and resources are tracked twice: on the investigator and on the scenario */
export type StatSourceType = "investigator" | "scenario";

export type InvestigatorNumericStat =
	| InvestigatorMainStatType
	| InvestigatorSkillType
	| InvestigatorGameStatType;

export type InvestigatorGameStatType =
	| "actions"
	| "resources"
	| "clues"
	| "handSize"
	| "doom"
	| "allySlots"
	| "upkeepResourcesIncrease";

export type SkillType = InvestigatorSkillType | "wild";

export type InvestigatorSignatureSkin = {
	id: string;
	image: InvestigatorSignature["image"];
};

export type SelectedInvestigator = {
	id: string;
	code: string;
	signature: InvestigatorSignature;
	skin: InvestigatorSignatureSkin | null;
	image: InvestigatorImage;
	signatureGroupId: string;
};

export type FactionFilterType = Faction | "spoiler";
