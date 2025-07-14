import { selectBoardInvestigatorSettings } from "@modules/board/base/entities/lib";
import { selectBoardById } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { createInvestigatorBoard } from "@modules/mechanics/board/base/entities/lib/createInvestigatorBoard";
import type { RootState } from "@shared/model";

export const selectCleanInvestigatorBoard =
	(boardId: BoardId) => (state: RootState) => {
		const board = selectBoardById(boardId)(state);
		const settings = selectBoardInvestigatorSettings(boardId)(state);
		return createInvestigatorBoard({
			...board,
			...settings,
		});
	};
