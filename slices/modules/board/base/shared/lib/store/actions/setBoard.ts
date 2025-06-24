import { createAction } from "@reduxjs/toolkit";
import type {
	ChangeBoardEventPayload,
	InvestigatorBoard,
	PropsWithBoard,
} from "../../../model";

export type SetBoardPayload = ChangeBoardEventPayload & {
	data: InvestigatorBoard;
};

export const setBoard = createAction<SetBoardPayload>("board/set");

export type BoardChangedPayload = SetBoardPayload & PropsWithBoard;

export const boardChanged = createAction<BoardChangedPayload>("board/changed");
