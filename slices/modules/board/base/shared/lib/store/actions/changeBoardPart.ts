import { createAction } from "@reduxjs/toolkit";
import type { SetBoardPartInternalPayload } from "../reducers";

export type ChangeBoardPartPayload = SetBoardPartInternalPayload & {
	code: string;
};

export const changeBoardPart =
	createAction<ChangeBoardPartPayload>("board/changePart");
