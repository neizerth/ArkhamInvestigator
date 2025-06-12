import type { SetBoardInternalPayload } from "@modules/board/base/shared/lib/store/features/board/reducers";
import { createAction } from "@reduxjs/toolkit";

export type ChangeBoardPayload = SetBoardInternalPayload & {
	code: string;
};

export const changeBoard = createAction<ChangeBoardPayload>("board/change");
