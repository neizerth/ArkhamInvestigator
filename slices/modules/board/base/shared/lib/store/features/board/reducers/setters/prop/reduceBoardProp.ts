import type { BoardDraft, BoardKey } from "@modules/board/base/shared/model";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
	type HandleReduceBoardPropOptions,
	handleReduceBoardProp,
} from "../../../handlers";

export type ReduceBoardPropPayload<K extends BoardKey> = Omit<
	HandleReduceBoardPropOptions<K>,
	"state"
>;

export const reduceBoardProp = <K extends BoardKey>(
	state: BoardDraft,
	{ payload }: PayloadAction<ReduceBoardPropPayload<K>>,
) => {
	handleReduceBoardProp({
		...payload,
		state,
	});
};
