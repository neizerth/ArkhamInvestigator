import type { ImageRequireSource } from "react-native";

const guardian = require('./guardian.png');
const mystic = require('./mystic.png');
const rogue = require('./rogue.png');
const seeker = require('./seeker.png');
const survivor = require('./survivor.png');

export const factionImages: Record<string, ImageRequireSource> = {
  guardian,
  mystic,
  rogue,
  seeker,
  survivor
}