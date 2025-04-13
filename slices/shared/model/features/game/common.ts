import type { InvestigatorImage, Story } from "@shared/model";
import type {
	Investigator as InvestigatorMedia,
	InvestigatorSignature,
} from "arkham-investigator-data";
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

export type InvestigatorGameStatType = "actions" | "resources" | "clues";

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

export type InvestigatorDetails = {
	investigator: InvestigatorSignature;
	alternate: InvestigatorDetails[];
	story: Story;
	media?: InvestigatorMedia;
	isOfficial: boolean;
};

export type InvestigatorDetailItem<T = object> = {
	id: string;
	code: string;
	imageId: string;
	image: InvestigatorSignature["image"];
	faction: Faction;
	type: InvestigatorSignature["type"] | "skin";
	icon?: string;
	name: string;
	value: string | null;
	data?: T;
};

export type FactionFilterType = Faction | "spoiler";
