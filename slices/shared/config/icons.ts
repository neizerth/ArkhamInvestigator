import type { InvestigatorBoardStat } from "@shared/model";

const baseIcons = {
	health: "health",
	sanity: "sanity",
	clues: "clue",
	actions: "action",
	resources: "resource",
} as const;

export const classicStatIcons: Record<InvestigatorBoardStat, string> = {
	...baseIcons,
	doom: "poi_side",
	handSize: "card-outline",
	willpower: "skill_willpower",
	agility: "skill_agility",
	combat: "skill_combat",
	intellect: "skill_intellect",
};

export const simpleStatIcons: Record<InvestigatorBoardStat, string> = {
	...baseIcons,
	doom: "poi_side",
	handSize: "card-outline",
	willpower: "willpower",
	agility: "agility",
	combat: "combat",
	intellect: "intellect",
};

export const iconMapping = {
	stat: {
		classic: classicStatIcons,
		simple: simpleStatIcons,
	},
};
