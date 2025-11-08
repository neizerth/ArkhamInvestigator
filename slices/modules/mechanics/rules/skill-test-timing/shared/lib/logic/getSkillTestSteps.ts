import type { RulesItemStep } from "@modules/mechanics/rules/base/shared/model";
import { isNotNil } from "ramda";
import type { SkillTestStep } from "../../model";

export const getSkillTestSteps = (item: RulesItemStep): SkillTestStep[] => {
	const { table, rules } = item;
	if (!table || !rules) {
		return [];
	}
	return table
		.map((tableEntry): SkillTestStep | undefined => {
			const { text, color } = tableEntry.row[0];
			const rule = rules.find((item) => item.title === text);
			if (!rule) {
				return;
			}
			const indexRe = /^([^.\s]+)\.?\s+(.*)$/;
			const match = text.match(indexRe);
			if (!match) {
				return;
			}
			const index = match[1];
			const description = match[2];

			return {
				...rule,
				text: description,
				index,
				color,
			};
		})
		.filter(isNotNil);
};
