import type { InvestigatorImage } from "arkham-investigator-data";
import type { InvestigatorSource } from "../../api";
import type { InvestigatorDetails, InvestigatorGameStatType, InvestigatorMainStatType, InvestigatorSkillType, SelectedInvestigator } from "./common";
import type { SkillCheckHistoryItem } from "./skillCheck";

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
  historyIndex: number
  checkHistory: SkillCheckHistoryItem[]
  details: InvestigatorDetails
  selection: SelectedInvestigator
}

export type HistoryItem = {
  id: string
  type: InvestigatorBoardStat
  value: number
}
