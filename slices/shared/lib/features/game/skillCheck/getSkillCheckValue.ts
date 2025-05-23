import type {
	InvestigatorBoardValues,
	SkillCheckItem,
	SkillCheckOperator,
} from "@shared/model";
import { evaluate } from "mathjs";

const operatorMapping: Record<SkillCheckOperator, string> = {
	add: "+",
	subtract: "-",
	multiply: "*",
	divide: "/",
};

export type GetValueOptions = {
	data: SkillCheckItem[];
	value?: InvestigatorBoardValues;
};
export const getSkillCheckValue = ({ data, value }: GetValueOptions) => {
	const expression = getExpression(data);
	try {
		const result = evaluate(expression, value);

		return Math.max(0, result);
	} catch (error) {
		console.error("Error evaluating expression:", error);
		return 0;
	}
};

const getExpression = (data: SkillCheckItem[]) => {
	const source = data
		.map((item) => {
			if (item.type === "operator") {
				return operatorMapping[item.operator];
			}
			if (item.type === "number") {
				return item.value;
			}
			return item.statType;
		})
		.join("");

	// added auto floor evaluation
	return source.replace(/([+-]?)(([^+-]*)\/[\d\w]+)/, "$1floor($2)");
};
