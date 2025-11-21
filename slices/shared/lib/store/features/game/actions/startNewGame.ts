import { createAction } from "@reduxjs/toolkit";

export const startNewGame = createAction("game/startNew");

export const newGameStarted = createAction("game/started");
