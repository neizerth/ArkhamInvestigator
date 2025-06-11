import type { BoardReducer } from "@modules/board/base/shared/model";
import {
	type HandleReduceBoardOptions,
	handleReduceBoard,
} from "../../handlers";

export type ReduceBoardPayload = Omit<HandleReduceBoardOptions, "state">;

export const reduceBoard: BoardReducer<ReduceBoardPayload> = (
	state,
	{ payload },
) => {
	handleReduceBoard({
		...payload,
		state,
	});
};
