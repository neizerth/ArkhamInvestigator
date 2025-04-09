import type { SkillCheckOperator } from "@shared/model";
import { characters } from "../../../../config";

export const operatorMapping: Record<SkillCheckOperator, string> = {
	add: characters.plus,
	subtract: characters.minus,
	multiply: characters.multiply,
	divide: characters.divide,
};
