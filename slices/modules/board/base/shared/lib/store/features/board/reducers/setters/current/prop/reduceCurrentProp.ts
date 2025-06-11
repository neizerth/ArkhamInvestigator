import type { BoardDraft, BoardKey } from "@modules/board/base/shared/model";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
	type HandleReduceBoardPropOptions,
	handleReduceBoardProp,
} from "../../../../handlers";

export type ReduceCurrentPropPayload<K extends BoardKey> = Omit<
	HandleReduceBoardPropOptions<K>,
	"state" | "boardId"
>;

export const reduceCurrentProp = <K extends BoardKey>(
	state: BoardDraft,
	{ payload }: PayloadAction<ReduceCurrentPropPayload<K>>,
) => {
	handleReduceBoardProp({
		...payload,
		state,
		boardId: "current",
	});
};
