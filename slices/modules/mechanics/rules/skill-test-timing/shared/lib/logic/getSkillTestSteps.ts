import type { RulesItemStep } from "@modules/mechanics/rules/base/shared/model";
import { isNotNil } from "ramda";
import type { SkillTestStep } from "../../model";

export const getSkillTestSteps = (item: RulesItemStep): SkillTestStep[] => {
	const { table, rules } = item;
	if (!table || !rules) {
		return [];
	}
	return table
		.slice(1)
		.map((tableEntry, index): SkillTestStep | undefined => {
			const cell = tableEntry.row[0];
			if (!cell) {
				return;
			}
			const { text, color } = cell;
			const rule = rules.find((item) => item.title === text);
			if (!rule) {
				return {
					id: `window-${index}`,
					type: "player-window",
					index,
					color,
					text: cell.text,
					title: cell.text,
					name: cell.text,
					description: cell.text,
				};
			}
			const base = {
				...rule,
				type: "step",
				color,
			} as const;
			const indexRe = /^([^.\s]+)\.?\s+(.*)$/;
			const match = text.match(indexRe);

			if (!match) {
				return {
					...base,
					name: rule.title,
					description: rule.title,
					index,
					color,
				};
			}

			const name = match[1];
			const description = match[2];

			return {
				...base,
				name,
				description,
				index,
				color,
			};
		})
		.filter(isNotNil);
};
