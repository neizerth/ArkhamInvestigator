import type { SkillCheckDifficultyType } from "@modules/board/skill-check/shared/model";
import type { RootState } from "@shared/model";
import { selectSkillCheckDifficultyType } from "../skillCheck";

const mapping: Record<SkillCheckDifficultyType, string> = {
	gt: ">",
	gte: "⩾",
};

export const selectSkillCheckDifficultyCharacter = (state: RootState) => {
	const type = selectSkillCheckDifficultyType(state);
	if (!type) {
		return mapping.gte;
	}
	return mapping[type];
};
