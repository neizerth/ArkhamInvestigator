import type { Faction, FactionFilterType } from "../model";

export const FACTION_VALUES: Faction[] = [
	"guardian",
	"seeker",
	"rogue",
	"mystic",
	"survivor",
	"neutral",
];

export const factionFilterTypes: FactionFilterType[] = [
	...FACTION_VALUES,
	"spoiler",
];
