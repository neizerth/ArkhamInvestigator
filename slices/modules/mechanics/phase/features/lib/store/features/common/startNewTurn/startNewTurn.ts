import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export const startNewTurn =
	createAction<PropsWithBoardId>("phase/startNewTurn");

type NewTurnStartedPayload = PropsWithBoardId & {
	turnId: string;
	oldTurnId?: string | null;
};

export const newTurnStarted = createAction<NewTurnStartedPayload>(
	"phase/newTurnStarted",
);
