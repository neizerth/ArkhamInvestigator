import type { BoardDraft, BoardKey } from "@modules/board/base/shared/model";
import type { PayloadAction } from "@reduxjs/toolkit";
import { handleSetBoardProp } from "./handleSetBoardProp";
import type { SetBoardPropPayload } from "./setBoardProp";

export const setBoardPropInternal = <K extends BoardKey>(
	state: BoardDraft,
	{ payload }: PayloadAction<SetBoardPropPayload<K>>,
) => {
	handleSetBoardProp(state, payload);
};
