import type { SkillCheckDifficultyType } from "@modules/board/skill-check/shared/model";
import type { RevealedChaosBagToken } from "@modules/chaos-bag/reveal/base/shared/model";
import { isAutoFail } from "../auto/isAutoFail";
import { isAutoSuccess } from "../auto/isAutoSuccess";
import { getSkillCheckResultSucceedBy } from "./getSkillCheckResultSucceedBy";

type Options = {
	tokens: RevealedChaosBagToken[];
	result: number;
	difficulty: number;
	difficultyType: SkillCheckDifficultyType;
};

export const getSkillCheckSucceedBy = (options: Options) => {
	if (isAutoSuccess(options)) {
		return getSkillCheckResultSucceedBy({
			...options,
			difficulty: 0,
		});
	}
	if (isAutoFail(options)) {
		return getSkillCheckResultSucceedBy({
			...options,
			result: 0,
		});
	}
	return getSkillCheckResultSucceedBy(options);
};
