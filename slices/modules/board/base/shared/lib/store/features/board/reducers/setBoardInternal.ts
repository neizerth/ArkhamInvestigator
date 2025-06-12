import type { BoardReducer } from "@modules/board/base/shared/model";
import { type HandleSetBoardOptions, handleSetBoard } from "../handlers";

export type ReduceBoardInternalPayload = Omit<HandleSetBoardOptions, "state">;

export const setBoardInternal: BoardReducer<ReduceBoardInternalPayload> = (
	state,
	{ payload },
) => {
	handleSetBoard({
		...payload,
		state,
	});
};
