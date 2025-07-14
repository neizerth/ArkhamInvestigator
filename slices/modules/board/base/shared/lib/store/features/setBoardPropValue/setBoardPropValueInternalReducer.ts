import type { BoardDraft } from "@modules/board/base/shared/model";
import type { PayloadAction } from "@reduxjs/toolkit";
import { handleSetBoardPropValue } from "./handleSetBoardPropValue";
import type { SetBoardPropValuePayload } from "./setBoardPropValue";

export const setBoardPropValueInternalReducer = (
	state: BoardDraft,
	{ payload }: PayloadAction<SetBoardPropValuePayload>,
) => {
	handleSetBoardPropValue(state, payload);
};
