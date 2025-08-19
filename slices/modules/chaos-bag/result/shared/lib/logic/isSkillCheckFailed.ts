import type { SkillCheckDifficultyType } from "@modules/board/skill-check/shared/model";
import type { RevealedChaosBagToken } from "@modules/chaos-bag/reveal/base/shared/model";
import { getSkillCheckResult } from "./getSkillCheckResult";
import { isAutoFail } from "./isAutoFail";

type Options = {
	skillValue: number;
	difficulty: number;
	difficultyType: SkillCheckDifficultyType;
	tokens: RevealedChaosBagToken[];
};

export const isSkillCheckFailed = (options: Options) => {
	if (isAutoFail(options)) {
		return true;
	}

	const { difficulty, difficultyType } = options;

	const result = getSkillCheckResult(options);

	const passed =
		difficultyType === "gt" ? result > difficulty : result >= difficulty;

	return !passed;
};
