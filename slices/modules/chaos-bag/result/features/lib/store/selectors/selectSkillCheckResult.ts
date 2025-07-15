import type { BoardId } from "@modules/board/base/shared/model";
import type { SkillCheckResult } from "@modules/board/skill-check/shared/model";
import {
	selectChaosBagSkillValue,
	selectRevealedTokens,
} from "@modules/chaos-bag/reveal/base/shared/lib";
import { selectChaosBagTokenValues } from "@modules/chaos-bag/value/features/lib";
import { createSelector } from "@reduxjs/toolkit";
import { getSkillCheckResult } from "../../logic";

export const selectSkillCheckResult = (boardId: BoardId) =>
	createSelector(
		[
			selectChaosBagSkillValue,
			selectRevealedTokens,
			selectChaosBagTokenValues(boardId),
		],
		(skillValue, tokens, tokenValues): SkillCheckResult | null => {
			if (typeof skillValue !== "number") {
				return null;
			}

			return getSkillCheckResult({
				skillValue,
				tokens,
				tokenValues,
			});
		},
	);
