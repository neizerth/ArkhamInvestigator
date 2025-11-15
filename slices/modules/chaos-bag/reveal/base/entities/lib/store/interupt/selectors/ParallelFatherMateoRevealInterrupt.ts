import { selectInvestigatorBoards } from "@modules/board/base/shared/lib";
import {
	selectAvailableTokens,
	selectChaosBagSkillCheckBoardId,
} from "@modules/chaos-bag/reveal/base/shared/lib";
import { InvesigatorCode } from "@modules/mechanics/investigator/entities/config/codes";
import { createSelector } from "@reduxjs/toolkit";

const code = InvesigatorCode.FatherMateo.parallel;

const cannotInterrupt = {
	code,
	canInterrupt: false,
};
export const ParallelFatherMateoRevealInterrupt = createSelector(
	[
		selectInvestigatorBoards,
		selectChaosBagSkillCheckBoardId,
		selectAvailableTokens,
	],
	(boards, boardId, contents) => {
		if (!boardId) {
			return cannotInterrupt;
		}

		const haveSealedToken = contents.some(
			({ sealData, type }) =>
				type === "bless" &&
				sealData?.type === "investigator" &&
				sealData.boardId === boardId,
		);

		if (!haveSealedToken) {
			return cannotInterrupt;
		}

		const canInterrupt = boards.some(
			(board) => board.investigator.code === code,
		);

		return {
			code,
			canInterrupt,
		};
	},
);
