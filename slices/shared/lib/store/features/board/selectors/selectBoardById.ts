import type { AppSelector } from "@shared/model";
import type { InvestigatorBoard } from "@shared/model";
import { propEq } from "ramda";
import { selectInvestigatorBoards } from "../board";

export const selectBoardById =
	(id: number): AppSelector<InvestigatorBoard | undefined> =>
	(state) => {
		const boards = selectInvestigatorBoards(state);
		const board = boards.find(propEq(id, "id")) as InvestigatorBoard;

		return board;
	};
