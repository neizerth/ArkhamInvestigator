import type { Faction } from "@shared/model";
import type { ImageRequireSource } from "react-native";

export const guardian = require('./guardian.svg');
export const mystic = require('./mystic.svg');
export const rogue = require('./rogue.svg');
export const seeker = require('./seeker.svg');
export const survivor = require('./survivor.svg');
export const neutral = require('./neutral.svg');

export const factionPatterns: Record<Faction, ImageRequireSource> = {
  guardian,
  mystic,
  rogue,
  seeker,
  survivor,
  neutral
}