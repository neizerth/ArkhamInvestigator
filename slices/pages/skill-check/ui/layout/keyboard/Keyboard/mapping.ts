import { characters } from "@pages/skill-check/config";
import type { SkillCheckOperator } from "@shared/model";

export const operatorMapping: Record<SkillCheckOperator, string> = {
	add: characters.plus,
	subtract: characters.minus,
	multiply: characters.multiply,
	divide: characters.divide,
};
