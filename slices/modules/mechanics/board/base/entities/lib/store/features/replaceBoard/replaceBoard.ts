import type {
	PropsWithBoard,
	PropsWithBoardId,
} from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type ReplaceBoardPayload = PropsWithBoardId & PropsWithBoard;

export const replaceBoard = createAction<ReplaceBoardPayload>("board/replace");
