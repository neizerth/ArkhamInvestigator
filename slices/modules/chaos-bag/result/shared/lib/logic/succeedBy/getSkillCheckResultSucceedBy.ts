import type { SkillCheckDifficultyType } from "@modules/board/skill-check/shared/model";

type Options = {
	result: number;
	difficulty: number;
	difficultyType: SkillCheckDifficultyType;
};

export const getSkillCheckResultSucceedBy = ({
	result,
	difficulty,
	difficultyType,
}: Options) => {
	const diff = result - difficulty;

	if (difficultyType === "gt") {
		return diff - 1;
	}
	return diff;
};
