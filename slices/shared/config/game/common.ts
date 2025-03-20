import type { Faction } from "../../model";

export const MAX_PLAYERS = 4;

export const START_GAME_RESOURCES_COUNT = 5;
export const NEW_TURN_ACTIONS_COUNT = 3;

export const FACTION_ORDER: Record<Faction, number> = {
	guardian: 1,
	seeker: 2,
	rogue: 3,
	mystic: 4,
	survivor: 5,
	neutral: 6,
};
