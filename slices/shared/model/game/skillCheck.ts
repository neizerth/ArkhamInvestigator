import { InvestigatorBoardStats } from "./board"

export type SkillCheckInfo = {
  type: InvestigatorBoardStats
  expression: string
  value: number
}

export type SkillCheckOperator = '+' | '-' | '*' | '/';