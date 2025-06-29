import type { BoardDraft, BoardKey } from "@modules/board/base/shared/model";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { SetBoardPropPayload } from "../../actions";
import { handleSetBoardProp } from "../../handlers";

export const setBoardPropInternal = <K extends BoardKey>(
	state: BoardDraft,
	{ payload }: PayloadAction<SetBoardPropPayload<K>>,
) => {
	handleSetBoardProp(state, payload);
};
