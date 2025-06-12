import type { BoardDraft, BoardKey } from "@modules/board/base/shared/model";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
	type HandleSetBoardPropOptions,
	handleSetBoardProp,
} from "../handlers";

export type SetBoardPropInternalPayload<K extends BoardKey> = Omit<
	HandleSetBoardPropOptions<K>,
	"state"
>;

export const setBoardPropInternal = <K extends BoardKey>(
	state: BoardDraft,
	{ payload }: PayloadAction<SetBoardPropInternalPayload<K>>,
) => {
	handleSetBoardProp({
		...payload,
		state,
	});
};
