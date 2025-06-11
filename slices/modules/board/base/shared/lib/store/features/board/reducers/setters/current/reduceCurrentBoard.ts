import type { BoardReducer } from "@modules/board/base/shared/model";
import {
	type HandleReduceBoardOptions,
	handleReduceBoard,
} from "../../../handlers";

export type ReduceCurrentBoardPayload = Omit<
	HandleReduceBoardOptions,
	"state" | "boardId"
>;

export const reduceCurrentBoard: BoardReducer<ReduceCurrentBoardPayload> = (
	state,
	{ payload },
) => {
	handleReduceBoard({
		...payload,
		state,
		boardId: "current",
	});
};
