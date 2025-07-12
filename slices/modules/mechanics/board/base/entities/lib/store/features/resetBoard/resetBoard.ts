import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type ResetBoardPayload = PropsWithBoardId;

export const resetBoard = createAction<ResetBoardPayload>("board/reset");
