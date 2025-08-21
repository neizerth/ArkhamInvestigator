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
