import type { BoardReducer } from "@modules/board/base/shared/model";
import type { SetBoardPayload } from "../../actions";
import { handleSetBoard } from "../../handlers";

export const setBoardInternal: BoardReducer<SetBoardPayload> = (
	state,
	{ payload },
) => {
	handleSetBoard(state, payload);
};
