import type { BoardReducer } from "@modules/board/base/shared/model";
import {
	type SetBoardProgressPayload,
	handleSetBoardProgress,
} from "./handleSetBoardProgress";

export const setBoardProgressReducer: BoardReducer<SetBoardProgressPayload> = (
	state,
	{ payload },
) => {
	handleSetBoardProgress(state, payload);
};
