import type { Faction } from "@shared/model";
import type { ImageRequireSource } from "react-native";

export const guardian = require('./guardian.png');
export const mystic = require('./mystic.png');
export const rogue = require('./rogue.png');
export const seeker = require('./seeker.png');
export const survivor = require('./survivor.png');
export const neutral = require('./neutral.png');

export const guardianParallel = require('./guardian_parallel.png');
export const mysticParallel = require('./mystic_parallel.png');
export const rogueParallel = require('./rogue_parallel.png');
export const seekerParallel = require('./seeker_parallel.png');
export const survivorParallel = require('./survivor_parallel.png');
export const neutralParallel = require('./neutral_parallel.png');

type Images = Record<Faction, ImageRequireSource>

export const regularImages: Images = {
  guardian,
  mystic,
  rogue,
  seeker,
  survivor,
  neutral
}

export const parallelImages: Images = {
  guardian: guardianParallel,
  mystic: mysticParallel,
  rogue: rogueParallel,
  seeker: seekerParallel,
  survivor: survivorParallel,
  neutral: neutralParallel
}