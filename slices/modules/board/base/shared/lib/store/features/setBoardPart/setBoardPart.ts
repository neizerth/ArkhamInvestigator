import type {
	ChangeBoardEventPayload,
	InvesigatorBoardPartial,
	PropsWithBoard,
} from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type SetBoardPartPayload = ChangeBoardEventPayload & {
	data: InvesigatorBoardPartial;
};

export const setBoardPart = createAction<SetBoardPartPayload>("board/setPart");

export type BoardPartChangedPayload = SetBoardPartPayload & PropsWithBoard;

export const boardPartChanged =
	createAction<BoardPartChangedPayload>("board/partChanged");
