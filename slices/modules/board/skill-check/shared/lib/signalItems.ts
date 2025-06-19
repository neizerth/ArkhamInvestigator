import type { InvestigatorBoardNumericStat } from "@shared/model";
import { v4 } from "uuid";
import type {
	NumberSkillCheckItem,
	OperatorSkillCheckItem,
	SkillCheckOperator,
	StatSkillCheckItem,
} from "../model";

export const createNumberItem = (
	value: number,
	removable?: boolean,
): NumberSkillCheckItem => ({
	id: v4(),
	type: "number",
	value,
	removable,
});

export const createOperatorItem = (
	operator: SkillCheckOperator,
): OperatorSkillCheckItem => ({
	id: v4(),
	type: "operator",
	operator,
});

export const createStatItem = (
	statType: InvestigatorBoardNumericStat,
): StatSkillCheckItem => ({
	id: v4(),
	type: "stat",
	statType,
});
