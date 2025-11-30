import type { RulesItemStep } from "@modules/mechanics/rules/base/shared/model";

export type SkillTestStep = RulesItemStep & {
	index: number;
	type: "step" | "player-window";
	name: string;
	description: string;
	color?: string;
};
