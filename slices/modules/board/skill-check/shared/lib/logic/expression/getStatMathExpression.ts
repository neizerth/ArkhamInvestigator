import type { InvestigatorNumericStat } from "@shared/model";
import type { SkillCheckItem, SkillCheckOperator } from "../../../model";
import {
	createNumberItem,
	createOperatorItem,
	createStatItem,
} from "../skillCheckItemCreators";

type Options = {
	statType: InvestigatorNumericStat;
	operator: SkillCheckOperator;
	value: number;
};

export const getStatMathExpression = ({
	statType,
	operator,
	value,
}: Options): SkillCheckItem[] => {
	return [
		createStatItem(statType),
		createOperatorItem(operator),
		createNumberItem(value),
	];
};
