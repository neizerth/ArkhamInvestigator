import type { AppSelector } from "@shared/model";
import type { InvestigatorBoard } from "@shared/model";
import { whereId } from "../../../../util";
import { selectInvestigatorBoards } from "../board";

export const selectBoardById =
	(id: number): AppSelector<InvestigatorBoard | undefined> =>
	(state) => {
		const boards = selectInvestigatorBoards(state);
		const board = boards.find(whereId(id)) as InvestigatorBoard;

		return board;
	};
