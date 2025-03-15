import type { Faction } from "@shared/model";
import type { ImageRequireSource } from "react-native";


import type { FC } from "react";
import type { SvgProps } from "react-native-svg";

import guardian from './guardian.svg'
import mystic from './mystic.svg'
import rogue from './rogue.svg'
import seeker from './seeker.svg'
import survivor from './survivor.svg'
import neutral from './neutral.svg'

export const factionPatterns: Record<Faction, FC<SvgProps>> = {
  guardian,
  mystic,
  rogue,
  seeker,
  survivor,
  neutral
}

export const factionPatternWidth: Record<Faction, number> = {
  guardian: 344,
  mystic: 360,
  rogue: 360,
  seeker: 344,
  survivor: 360,
  neutral: 360
}


export const patternHeight = 48;