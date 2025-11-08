import type { RulesItemStep } from "@modules/mechanics/rules/base/shared/model";

export type SkillTestStep = RulesItemStep & {
	index: string;
	color?: string;
};
