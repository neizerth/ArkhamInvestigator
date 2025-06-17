import { type ChangeBoardPartPayload, changeBoardPart } from "../actions";
import { createBoardThunk } from "../util";

export type SetBoardPartPayload = Omit<ChangeBoardPartPayload, "code">;

export const setBoardPart = createBoardThunk(changeBoardPart);
