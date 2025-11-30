import type {
	InvestigatorBoardNumericStat,
	InvestigatorSkillType,
} from "@shared/model";

export const isBaseSkillType = (
	skillType: InvestigatorBoardNumericStat,
): skillType is InvestigatorSkillType => {
	if (["willpower", "intellect", "combat", "agility"].includes(skillType)) {
		return true;
	}
	return false;
};
