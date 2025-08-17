import type { SkillCheckDifficultyType } from "../../model";

export const getDefaulSkillCheckDifficultyType = (
	type: SkillCheckDifficultyType | null,
) => {
	return type ?? "gte";
};
