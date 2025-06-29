import type { BoardDraft } from "@modules/board/base/shared/model";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { SetBoardPropValuePayload } from "../../actions";
import { handleSetBoardPropValue } from "../../handlers";

export const setBoardPropValueInternal = (
	state: BoardDraft,
	{ payload }: PayloadAction<SetBoardPropValuePayload>,
) => {
	handleSetBoardPropValue(state, payload);
};
