import type {
	BoardDraft,
	BoardId,
	InvestigatorBoardHistoryItemData,
} from "@modules/board/base/shared/model";
import { v4 } from "uuid";
import { getBoardIndex } from "../../getters/props/getBoardIndex";

export type HandleAddBoardHistoryItemOptions = {
	state: BoardDraft;
	boardId: BoardId;
	data: InvestigatorBoardHistoryItemData;
};

export const handleAddBoardHistoryItem = ({
	state,
	boardId,
	data,
}: HandleAddBoardHistoryItemOptions) => {
	const index = getBoardIndex({
		state,
		boardId,
	});

	if (typeof index !== "number") {
		return;
	}

	const item = {
		id: v4(),
		...data,
	};

	state.investigatorBoards[index].history.push(item);
};
