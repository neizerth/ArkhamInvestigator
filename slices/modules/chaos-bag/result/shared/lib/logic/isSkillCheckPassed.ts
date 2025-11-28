import type { SkillCheckDifficultyType } from "@modules/board/skill-check/shared/model";
import type { RevealedChaosBagTokenData } from "@modules/chaos-bag/reveal/base/shared/model";
import { getSkillCheckResultValue } from "./getSkillCheckResultValue";

type Options = {
	skillValue: number;
	difficulty: number;
	difficultyType: SkillCheckDifficultyType;
	tokens: RevealedChaosBagTokenData[];
};

export const isSkillCheckPassed = (options: Options) => {
	const { difficulty, difficultyType } = options;

	if (difficulty === 0 && difficultyType === "gte") {
		return true;
	}

	const result = getSkillCheckResultValue(options);

	if (difficultyType === "gt") {
		return result > difficulty;
	}

	return result >= difficulty;
};
