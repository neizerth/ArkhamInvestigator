import type { BoardReducer } from "@modules/board/base/shared/model";
import { type HandleSetBoardOptions, handleSetBoard } from "../../handlers";

export type SetBoardInternalPayload = Omit<HandleSetBoardOptions, "state">;

export const setBoardInternal: BoardReducer<SetBoardInternalPayload> = (
	state,
	{ payload },
) => {
	handleSetBoard({
		...payload,
		state,
	});
};
