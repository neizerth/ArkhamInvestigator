import type { SkillCheckDifficultyType } from "@modules/board/skill-check/shared/model";
import type { RevealedChaosBagTokenData } from "@modules/chaos-bag/reveal/base/shared/model";
import { isAutoFail } from "./auto/isAutoFail";
import { isAutoSuccess } from "./auto/isAutoSuccess";
import { getSkillCheckResult } from "./getSkillCheckResult";

type Options = {
	skillValue: number;
	difficulty: number;
	difficultyType: SkillCheckDifficultyType;
	tokens: RevealedChaosBagTokenData[];
};

export const isSkillCheckFailed = (options: Options) => {
	if (isAutoFail(options)) {
		return true;
	}

	if (isAutoSuccess(options)) {
		return false;
	}

	const { difficulty, difficultyType } = options;

	if (difficulty === 0 && difficultyType === "gte") {
		return false;
	}

	const result = getSkillCheckResult(options);

	const passed =
		difficultyType === "gt" ? result > difficulty : result >= difficulty;

	return !passed;
};
