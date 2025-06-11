import type { BoardId } from "@modules/board/base/shared/model";
import type { BoardState } from "../../board";
import { getBoardProp } from "./getBoardProp";

export type GetBoardIndexOptions = {
	state: BoardState;
	boardId: BoardId;
};

export const getBoardIndex = (options: GetBoardIndexOptions) => {
	const index = getBoardProp({
		...options,
		prop: "index",
	});

	return index;
};
