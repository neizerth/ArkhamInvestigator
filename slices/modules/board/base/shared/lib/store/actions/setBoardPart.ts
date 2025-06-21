import { createAction } from "@reduxjs/toolkit";
import type {
	ChangeBoardEventPayload,
	InvesigatorBoardPartial,
	PropsWithBoard,
} from "../../../model";

export type SetBoardPartPayload = ChangeBoardEventPayload & {
	data: InvesigatorBoardPartial;
};

export const setBoardPart = createAction<SetBoardPartPayload>("board/setPart");

export type BoardPartChangedPayload = SetBoardPartPayload & PropsWithBoard;

export const boardPartChanged =
	createAction<BoardPartChangedPayload>("board/partChanged");
