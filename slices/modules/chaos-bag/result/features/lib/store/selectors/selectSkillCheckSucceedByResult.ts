import type { BoardId } from "@modules/board/base/shared/model";
import {
	selectSkillCheckDifficulty,
	selectSkillCheckDifficultyType,
} from "@modules/board/skill-check/shared/lib";
import type { RootState } from "@shared/model";
import { selectSkillCheckResult } from "./selectSkillCheckResult";

export const selectSkillCheckSucceedByResult =
	(boardId: BoardId) => (state: RootState) => {
		const difficultyValue = selectSkillCheckDifficulty(state);
		const resultValue = selectSkillCheckResult(boardId)(state);
		const type = selectSkillCheckDifficultyType(state);

		if (resultValue === "fail") {
			return 0;
		}
		const total = typeof resultValue === "number" ? resultValue : 0;
		const difficulty = difficultyValue || 0;

		const diff = total - difficulty;

		if (type === "gt") {
			return diff - 1;
		}
		return diff;
	};
