import type { Faction } from "@shared/model";

export const MAX_PLAYERS = 4;

export const FACTION_ORDER: Record<Faction, number> = {
  guardian: 1,
  seeker: 2,
  rogue: 3,
  mystic: 4,
  survivor: 5,
  neutral: 6
} 