import type { InvestigatorNumericStat } from "@shared/model";
import type { SkillCheckOperator } from "../../../model";
import { getStatMathExpression } from "./getStatMathExpression";

type Options = {
	statType: InvestigatorNumericStat;
	statValue: number;
	value: number;
};

export const getStatDiffExpression = ({
	statType,
	statValue,
	value,
}: Options) => {
	const diff = Math.abs(value - statValue);

	if (diff === 0) {
		return [];
	}

	const operator: SkillCheckOperator = value > statValue ? "add" : "subtract";

	return getStatMathExpression({
		statType,
		operator,
		value: diff,
	});
};
