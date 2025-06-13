import { createAction } from "@reduxjs/toolkit";
import type { ChangeBoardEventPayload } from "../../../model";
import type { SetBoardPartInternalPayload } from "../reducers";

export type ChangeBoardPartPayload = SetBoardPartInternalPayload &
	ChangeBoardEventPayload;

export const changeBoardPart =
	createAction<ChangeBoardPartPayload>("board/changePart");
