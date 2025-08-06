import { selectSkillCheckDifficulty } from "@modules/board/skill-check/shared/lib";
import { selectChaosBagSkillCheckType } from "@modules/chaos-bag/reveal/base/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { getSkillCheckText } from "./getSkillCheckText";

export const selectSkillCheckText = createSelector(
	[selectSkillCheckDifficulty, selectChaosBagSkillCheckType],
	(difficulty, type) => getSkillCheckText({ type, difficulty }),
);
