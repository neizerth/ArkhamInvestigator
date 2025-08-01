import type { BoardId } from "@modules/board/base/shared/model";
import type { SkillCheckResult } from "@modules/board/skill-check/shared/model";
import {
	selectChaosBagSkillValue,
	selectRevealedTokens,
} from "@modules/chaos-bag/reveal/base/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { getSkillCheckResult } from "../../logic";

export const selectSkillCheckResult = (boardId: BoardId) =>
	createSelector(
		[selectChaosBagSkillValue, selectRevealedTokens],
		(skillValue, tokens): SkillCheckResult | null => {
			if (typeof skillValue !== "number") {
				return null;
			}

			return getSkillCheckResult({
				skillValue,
				tokens,
			});
		},
	);
