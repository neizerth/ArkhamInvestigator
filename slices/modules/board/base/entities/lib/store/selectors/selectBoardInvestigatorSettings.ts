import { selectBoardById } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { selectInvestigatorSettings } from "@shared/lib";
import type { RootState } from "@shared/model";

export const selectBoardInvestigatorSettings =
	(boardId: BoardId) => (state: RootState) => {
		const board = selectBoardById(boardId)(state);
		const investigatorSettings = selectInvestigatorSettings(state);
		const { code } = board.investigator;
		const settings = investigatorSettings || {};

		return settings[code] || {};
	};
