import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";
import type { Box } from "@shared/model";

export type UpdateGameTextHeightPayload = PropsWithBoardId & {
	value: number;
	view: Box;
};

export const updateGameTextHeight = createAction<UpdateGameTextHeightPayload>(
	"board/updateGameTextHeight",
);

export const gameTextHeightUpdated = createAction<UpdateGameTextHeightPayload>(
	"board/gameTextHeightupdated",
);
