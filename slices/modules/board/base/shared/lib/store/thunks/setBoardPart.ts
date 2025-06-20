import { type ChangeBoardPartPayload, changeBoardPart } from "../actions";
import { createBoardThunk, createCurrentActionCreator } from "../util";

export type SetBoardPartPayload = Omit<ChangeBoardPartPayload, "code">;

export const setBoardPart = createBoardThunk(changeBoardPart);
export const setCurrentPart = createCurrentActionCreator(setBoardPart);
