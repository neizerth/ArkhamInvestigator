import type { SkillCheckDifficultyType } from "@modules/board/skill-check/shared/model";

type Options = {
	result: number;
	difficulty: number;
	difficultyType: SkillCheckDifficultyType;
};

export const getSkillCheckResultSucceedByDiff = ({
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

export const getSkillCheckResultSucceedBy = (options: Options) => {
	const { difficulty, difficultyType } = options;
	const diff = getSkillCheckResultSucceedByDiff(options);

	if (difficulty === 0 && difficultyType === "gte") {
		return Math.max(diff, 0);
	}
	return diff;
};
