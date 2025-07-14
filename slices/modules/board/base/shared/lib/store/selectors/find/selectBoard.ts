import type { InvestigatorBoard } from "@modules/board/base/shared/model/board";
import type { RootState } from "@shared/model";
import { selectInvestigatorBoards } from "../../board";

export const selectBoard =
	(selector: (board: InvestigatorBoard) => boolean) => (state: RootState) => {
		const boards = selectInvestigatorBoards(state);
		return boards.find(selector);
	};
