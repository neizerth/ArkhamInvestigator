import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export const startNewTurn =
	createAction<PropsWithBoardId>("phase/startNewTurn");

export const newTurnStarted = createAction<PropsWithBoardId>(
	"phase/newTurnStarted",
);
