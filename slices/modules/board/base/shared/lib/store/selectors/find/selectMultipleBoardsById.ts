import type {
	BoardId,
	InvestigatorBoard,
} from "@modules/board/base/shared/model";
import type { AppSelector } from "@shared/model";
import { prop, uniqBy } from "ramda";
import {
	selectCurrentInvestigatorIndex,
	selectInvestigatorBoards,
} from "../../board";
import { getBoardById } from "../../getters/find/getBoardById";

type Data = InvestigatorBoard[];

export const selectMultipleBoardsById =
	(ids: BoardId[]): AppSelector<Data> =>
	(state) => {
		const investigatorBoards = selectInvestigatorBoards(state);
		const currentInvestigatorIndex = selectCurrentInvestigatorIndex(state);

		const boards = ids.map((boardId) =>
			getBoardById({
				investigatorBoards,
				currentInvestigatorIndex,
				boardId,
			}),
		);

		return uniqBy(prop("id"), boards);
	};
