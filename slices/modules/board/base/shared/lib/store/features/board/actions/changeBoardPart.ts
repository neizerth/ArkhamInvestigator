import type { SetBoardPartInternalPayload } from "@modules/board/base/shared/lib/store/features/board/reducers";
import { createAction } from "@reduxjs/toolkit";

export type ChangeBoardPartPayload = SetBoardPartInternalPayload & {
	code: string;
};

export const changeBoardPart =
	createAction<ChangeBoardPartPayload>("board/changePart");
