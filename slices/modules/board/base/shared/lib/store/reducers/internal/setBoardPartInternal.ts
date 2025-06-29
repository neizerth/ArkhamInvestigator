import type { BoardReducer } from "@modules/board/base/shared/model";
import type { SetBoardPartPayload } from "../../actions";
import { handleSetBoardPart } from "../../handlers";

export const setBoardPartInternal: BoardReducer<SetBoardPartPayload> = (
	state,
	{ payload },
) => {
	handleSetBoardPart(state, payload);
};
