import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type GetCluesPayload = PropsWithBoardId & {
	count?: number;
};

export const getClues = createAction<GetCluesPayload>("board/getClues");
