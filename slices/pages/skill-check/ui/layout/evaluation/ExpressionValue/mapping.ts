import { characters } from "@pages/skill-check/config";
import { SkillCheckOperator } from "@shared/model";

export const operatorMapping: Record<SkillCheckOperator, string> = {
  add: '+',
  subtract: '-',
  multiply: '*',
  divide: '/'
}
