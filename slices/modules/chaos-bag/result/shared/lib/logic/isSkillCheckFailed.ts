import type { SkillCheckDifficultyType } from "@modules/board/skill-check/shared/model";
import type { RevealedChaosBagTokenData } from "@modules/chaos-bag/reveal/base/shared/model";
import { isAutoFail } from "./auto/isAutoFail";
import { isAutoSuccess } from "./auto/isAutoSuccess";
import { isSkillCheckPassed } from "./isSkillCheckPassed";

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

	const passed = isSkillCheckPassed(options);

	return !passed;
};
