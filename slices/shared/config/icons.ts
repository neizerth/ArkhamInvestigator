import type { InvestigatorBoardNumericStat } from "@shared/model";

const baseIcons = {
	health: "health",
	sanity: "sanity",
	clues: "clue",
	actions: "action",
	resources: "resource",
	upkeepResourcesIncrease: "resource",
} as const;

export const classicStatIcons: Record<InvestigatorBoardNumericStat, string> = {
	...baseIcons,
	doom: "poi_side",
	handSize: "card-outline",
	willpower: "skill_willpower",
	agility: "skill_agility",
	combat: "skill_combat",
	intellect: "skill_intellect",
	allySlots: "ally_inverted",
};

export const simpleStatIcons: Record<InvestigatorBoardNumericStat, string> = {
	...baseIcons,
	doom: "poi_side",
	handSize: "card-outline",
	willpower: "willpower",
	agility: "agility",
	combat: "combat",
	intellect: "intellect",
	allySlots: "ally_inverted",
};

export const iconMapping = {
	stat: {
		classic: classicStatIcons,
		simple: simpleStatIcons,
	},
};
