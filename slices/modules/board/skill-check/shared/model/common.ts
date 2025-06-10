import type { InvestigatorNumericStat } from "@shared/model";

export type SkillCheckHistoryItem = {
	id: string;
	pinned?: boolean;
	title?: string;
	type: InvestigatorNumericStat;
	expression: SkillCheckItem[];
	value: number;
};

export type SkillCheckOperator = "add" | "subtract" | "multiply" | "divide";

export type SkillCheckType = "operator" | "number" | "stat" | "command";

export type SkillCheck = {
	type: InvestigatorNumericStat;
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
	statType: InvestigatorNumericStat;
};

export type SkillCheckItem =
	| OperatorSkillCheckItem
	| NumberSkillCheckItem
	| StatSkillCheckItem;

export type SkillCheckCommandType = "clear" | "clear-last" | "empty";

export type SkillCheckDifficultyType = "gt" | "gte";

export type SkillCheckResult = number | "fail" | "success";
