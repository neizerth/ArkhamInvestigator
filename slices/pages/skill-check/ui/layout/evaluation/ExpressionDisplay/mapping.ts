import { characters } from "@pages/skill-check/config";
import { SkillCheckOperator } from "@shared/model";

export const operatorMapping: Record<SkillCheckOperator, string> = {
  add: '+',
  subtract: '-',
  multiply: characters.multiply,
  divide: characters.divide
}

export const iconMapping = {
  resources: 'resource'
}