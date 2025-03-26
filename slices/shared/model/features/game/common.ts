import type { InvestigatorSource, Story } from "@shared/model/api";
import type { Nullable } from "@shared/model/util";
import type {
	InvestigatorImage,
	Investigator as InvestigatorMedia,
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

export type SelectedInvestigator = {
	id: string;
	code: string;
	variantId: Nullable<string>;
	skinId: Nullable<string>;
	details: InvestigatorDetails;
};

export type InvestigatorDetails = {
	investigator: InvestigatorSource;
	alternate: InvestigatorDetails[];
	story: Story;
	media?: InvestigatorMedia;
	isOfficial: boolean;
};

export type InvestigatorDetailItem<T = object> = {
	id: string;
	imageId: string;
	image: InvestigatorImage;
	type: "custom" | "parallel" | "book" | "skin" | "default";
	icon?: string;
	name: string;
	value: string | null;
	details: InvestigatorDetails;
	data?: T;
};

export type FactionFilterType = Faction | "spoiler";
