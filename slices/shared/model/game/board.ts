import type { InvestigatorImage } from "arkham-investigator-data";
import type { InvestigatorSource } from "../api";
import type { InvestigatorGameStatType, InvestigatorMainStatType, InvestigatorSkillType } from "./common";

export type InvestigatorBoardStats = InvestigatorMainStatType | InvestigatorSkillType | InvestigatorGameStatType;

export type InvestigatorPicture = {
  id: string
  image: InvestigatorImage
}

export type InvestigatorBoardValues = Record<InvestigatorBoardStats, number> & {
  additionalAction: boolean
}

export type SkillCheckInfo = {
  type: InvestigatorBoardStats
  expression: string
  value: number
}

export type InvestigatorBoard = {
  investigator: InvestigatorSource
  picture: InvestigatorPicture
  isParallel: boolean
  baseValue: InvestigatorBoardValues
  value: InvestigatorBoardValues
  unique: boolean
  checkHistory: SkillCheckInfo[]
}