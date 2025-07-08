import type { InvestigatorBoardValues } from "../../model";

export const createFallbackBoardValues = (): InvestigatorBoardValues => ({
	health: 0,
	sanity: 0,
	willpower: 0,
	combat: 0,
	intellect: 0,
	agility: 0,
	actions: 0,
	clues: 0,
	handSize: 0,
	upkeepResourcesIncrease: 0,
	resources: 0,
	doom: 0,
});
