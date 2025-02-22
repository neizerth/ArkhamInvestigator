import type { InvestigatorImage } from "arkham-investigator-data";
import type { InvestigatorSource } from "../api";
import type { InvestigatorSkillType } from "./common";

type InvestigatorBoardStats = 'health' | 'sanity' | InvestigatorSkillType;

export type InvestigatorBoardValues = Record<InvestigatorBoardStats, number> & {
  additionalAction: boolean
}

export type InvestigatorBoard = {
  investigator: InvestigatorSource
  picture: {
    id: string
    image: InvestigatorImage
  }
  isParallel?: boolean
  baseValue: InvestigatorBoardValues
  value: InvestigatorBoardValues
}