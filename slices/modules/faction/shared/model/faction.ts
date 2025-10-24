import type { ImageRequireSource } from "react-native";

export type PropsWithFaction = {
	faction: Faction;
};

export type Faction =
	| "neutral"
	| "mystic"
	| "rogue"
	| "survivor"
	| "seeker"
	| "guardian";

export type FactionImages = Record<Faction, ImageRequireSource>;

export type FactionFilterType = Faction | "spoiler";

export type FactionIconType = "default" | "alt";
