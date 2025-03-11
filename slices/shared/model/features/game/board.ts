import type { InvestigatorImage } from "arkham-investigator-data";
import type { InvestigatorSource } from "../api";
import type { InvestigatorDetails, InvestigatorGameStatType, InvestigatorMainStatType, InvestigatorSkillType } from "./common";
import { SkillCheckHistoryItem } from "./skillCheck";

export type InvestigatorBoardStat = InvestigatorMainStatType | InvestigatorSkillType | InvestigatorGameStatType;

export type InvestigatorPicture = {
  id: string
  image: InvestigatorImage
}

export type InvestigatorBoardValues = Record<InvestigatorBoardStat, number> & {
  additionalAction: boolean
}


export type InvestigatorBoard = {
  id: number
  investigator: InvestigatorSource
  picture: InvestigatorPicture
  isParallel: boolean
  baseValue: InvestigatorBoardValues
  value: InvestigatorBoardValues
  unique: boolean
  history: HistoryItem[]
  checkHistory: SkillCheckHistoryItem[]
  details: InvestigatorDetails
}

export type HistoryItem = {
  id: string
  type: InvestigatorBoardStat
  value: number
}
