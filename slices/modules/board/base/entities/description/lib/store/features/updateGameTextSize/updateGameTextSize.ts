import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";
import type { Box } from "@shared/model";

export type UpdateGameSizeHeightPayload = PropsWithBoardId & {
	value: Box;
	view: Box;
};

export const updateGameTextSize = createAction<UpdateGameSizeHeightPayload>(
	"board/updateGameTextSize",
);

export const gameTextHeightUpdated = createAction<UpdateGameSizeHeightPayload>(
	"board/gameTextSizeUpdated",
);
