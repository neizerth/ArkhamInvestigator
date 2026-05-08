import type { BoardReducer } from "@modules/board/base/shared/model";
import {
	type SetBoardBackgroundPayload,
	handleSetBoardBackground,
} from "./handleSetBoardBackground";

export const setBoardBackgroundReducer: BoardReducer<
	SetBoardBackgroundPayload
> = (state, { payload }) => {
	handleSetBoardBackground(state, payload);
};
