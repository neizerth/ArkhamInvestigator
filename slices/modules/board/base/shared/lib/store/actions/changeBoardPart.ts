import { createAction } from "@reduxjs/toolkit";
import type {
	ChangeBoardEventPayload,
	InvesigatorBoardPartial,
} from "../../../model";

export type ChangeBoardPartPayload = ChangeBoardEventPayload & {
	data: InvesigatorBoardPartial;
};

export const changeBoardPart =
	createAction<ChangeBoardPartPayload>("board/changePart");
