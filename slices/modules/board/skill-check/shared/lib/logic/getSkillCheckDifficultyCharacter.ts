import type { SkillCheckDifficultyType } from "../../model";

const mapping: Record<SkillCheckDifficultyType, string> = {
	gt: ">",
	gte: "⩾",
};

export const getSkillCheckDifficultyCharacter = (
	type?: SkillCheckDifficultyType | null,
) => {
	if (!type) {
		return mapping.gte;
	}
	return mapping[type];
};
