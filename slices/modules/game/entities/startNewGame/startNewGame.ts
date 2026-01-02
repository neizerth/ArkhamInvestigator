import type { GameType } from "@modules/game/model";
import { createAction } from "@reduxjs/toolkit";

export type StartNewGamePayload = {
	type: GameType;
};

export const startNewGame = createAction<StartNewGamePayload>("game/startNew");
