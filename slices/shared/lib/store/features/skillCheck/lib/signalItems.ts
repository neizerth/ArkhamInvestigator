import type * as Types from "@shared/model";
import { v4 } from "uuid";

export const createNumberItem = (
	value: number,
	removable?: boolean,
): Types.NumberSkillCheckItem => ({
	id: v4(),
	type: "number",
	value,
	removable,
});

export const createOperatorItem = (
	operator: Types.SkillCheckOperator,
): Types.OperatorSkillCheckItem => ({
	id: v4(),
	type: "operator",
	operator,
});

export const createStatItem = (
	statType: Types.InvestigatorBoardStat,
): Types.StatSkillCheckItem => ({
	id: v4(),
	type: "stat",
	statType,
});
