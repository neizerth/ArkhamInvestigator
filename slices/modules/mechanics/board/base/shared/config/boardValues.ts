import type { InvestigatorBoardValues } from "@modules/board/base/shared/model";

const maxSkillValue = 20;
const minSkillValue = 0;

export const minNegativeHealthAndSanityValue = -20;

export const maxRegularValue = 100;
export const minRegularValue = 0;

export const maxBoardValues: Partial<InvestigatorBoardValues> = {
	clues: maxRegularValue,
	resources: maxRegularValue,
	actions: maxRegularValue,
	doom: maxRegularValue,

	willpower: maxSkillValue,
	intellect: maxSkillValue,
	combat: maxSkillValue,
	agility: maxSkillValue,

	upkeepResourcesIncrease: 10,
};

export const minBoardValues: Partial<InvestigatorBoardValues> = {
	clues: minRegularValue,
	resources: minRegularValue,
	actions: minRegularValue,
	doom: minRegularValue,

	willpower: minSkillValue,
	intellect: minSkillValue,
	combat: minSkillValue,
	agility: minSkillValue,

	upkeepResourcesIncrease: 0,
};

export const boardValuesLimit = {
	min: minBoardValues,
	max: maxBoardValues,
};
