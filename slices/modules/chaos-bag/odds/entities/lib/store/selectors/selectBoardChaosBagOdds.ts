import type { BoardId } from "@modules/board/base/shared/model";
import {
	selectSkillCheckDifficulty,
	selectSkillCheckDifficultyType,
} from "@modules/board/skill-check/shared/lib";
import { selectOddsSkillValue } from "@modules/chaos-bag/odds/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { getChaosOdds } from "../../logic";
import { selectBoardChaosOddsTokens } from "./selectBoardChaosOddsTokens";

export const selectBoardChaosBagOdds = (boardId: BoardId) =>
	createSelector(
		[
			selectSkillCheckDifficulty,
			selectSkillCheckDifficultyType,
			selectBoardChaosOddsTokens(boardId),
			selectOddsSkillValue,
		],
		(difficulty, difficultyType, tokens, skillValue) => {
			const available = tokens.filter(({ revealId }) => !revealId);
			const revealed = tokens.filter(({ revealId }) => revealId);

			return getChaosOdds({
				available,
				revealed,
				revealCount: 1,
				skillValue: skillValue ?? 0,
				difficulty: difficulty ?? 0,
				difficultyType: difficultyType ?? "gte",
			});
		},
	);
