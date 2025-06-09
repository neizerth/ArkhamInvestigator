import type { InvestigatorBoardNumericStat } from "./board";

export type SkillCheckHistoryItem = {
	id: string;
	pinned?: boolean;
	title?: string;
	type: InvestigatorBoardNumericStat;
	expression: SkillCheckItem[];
	value: number;
};

export type SkillCheckOperator = "add" | "subtract" | "multiply" | "divide";

export type SkillCheckType = "operator" | "number" | "stat" | "command";

export type SkillCheck = {
	type: InvestigatorBoardNumericStat;
	data: SkillCheckItem[];
};

export type OperatorSkillCheckItem = {
	id: string;
	type: "operator";
	operator: SkillCheckOperator;
};

export type NumberSkillCheckItem = {
	id: string;
	type: "number";
	value: number;
	removable?: boolean;
};

export type StatSkillCheckItem = {
	id: string;
	type: "stat";
	statType: InvestigatorBoardNumericStat;
};

export type SkillCheckItem =
	| OperatorSkillCheckItem
	| NumberSkillCheckItem
	| StatSkillCheckItem;

export type SkillCheckCommandType = "clear" | "clear-last" | "empty";

export type SkillCheckDifficultyType = "gt" | "gte";

export type SkillCheckResult = number | "fail" | "success";
