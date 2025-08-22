import { last } from "ramda";
import type { SkillCheckItem } from "../../../model";

export const sanitizeSkillCheckExpression = (data: SkillCheckItem[]) => {
	const lastItem = last(data);
	const validData = lastItem?.type === "operator" ? data.slice(0, -1) : data;

	return validData;
};
