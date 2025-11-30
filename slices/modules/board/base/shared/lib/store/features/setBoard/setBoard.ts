import type {
	ChangeBoardEventPayload,
	InvestigatorBoard,
	PropsWithBoard,
} from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type SetBoardPayload = ChangeBoardEventPayload & {
	data: InvestigatorBoard;
};

export const setBoard = createAction<SetBoardPayload>("board/set");

export type BoardChangedPayload = SetBoardPayload & PropsWithBoard;

export const boardSet = createAction<BoardChangedPayload>("board/set");
