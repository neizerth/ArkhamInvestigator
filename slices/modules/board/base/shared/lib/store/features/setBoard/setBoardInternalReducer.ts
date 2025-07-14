import type { BoardReducer } from "@modules/board/base/shared/model";
import { handleSetBoard } from "./handleSetBoard";
import type { SetBoardPayload } from "./setBoard";

export const setBoardInternalReducer: BoardReducer<SetBoardPayload> = (
	state,
	{ payload },
) => {
	handleSetBoard(state, payload);
};
