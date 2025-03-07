import type { InvestigatorBoardStat } from "./board"

export type SkillCheckInfo = {
  type: InvestigatorBoardStat
  expression: string
  value: number
}

export type SkillCheckOperator = 'add' | 'subtract' | 'multiply' | 'divide';

export type SkillCheckType = 'operator' | 'number' | 'stat' | 'command'

export type SkillCheck = {
  type: InvestigatorBoardStat
  data: SkillCheckItem[]
}

export type OperatorSkillCheckItem = {
  id: string
  type: 'operator'
  operator: SkillCheckOperator
}

export type NumberSkillCheckItem = {
  id: string
  type: 'number'
  value: number
}

export type StatSkillCheckItem = {
  id: string
  type: 'stat',
  statType: InvestigatorBoardStat
}

export type CommandSkillCheckItem = {
  id: string
  type: 'command',
  command: SkillCheckCommand
}

export type SkillCheckItem = OperatorSkillCheckItem | NumberSkillCheckItem | StatSkillCheckItem;

export type SkillCheckCommand = 'clear' | 'all-clear' | 'clear-last' | 'equals'