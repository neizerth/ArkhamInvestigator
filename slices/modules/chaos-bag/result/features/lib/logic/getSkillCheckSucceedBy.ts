import type { SkillCheckDifficultyType } from "@modules/board/skill-check/shared/model";
import type { ChaosTokenValue } from "@modules/chaos-bag/value/shared/model";

type Options = {
	result: ChaosTokenValue;
	difficulty: number;
	difficultyType: SkillCheckDifficultyType;
};

export const getSkillCheckSucceedBy = ({
	result,
	difficulty,
	difficultyType,
}: Options) => {
	if (result === "fail" || result === "success") {
		return 0;
	}
	const diff = result - difficulty;

	if (difficultyType === "gt") {
		return diff - 1;
	}
	return diff;
};
