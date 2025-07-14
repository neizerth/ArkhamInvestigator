import type { BoardReducer } from "@modules/board/base/shared/model";
import { handleSetBoardPart } from "./handleSetBoardPart";
import type { SetBoardPartPayload } from "./setBoardPart";

export const setBoardPartInternalReducer: BoardReducer<SetBoardPartPayload> = (
	state,
	{ payload },
) => {
	handleSetBoardPart(state, payload);
};
