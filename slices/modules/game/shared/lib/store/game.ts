import type { GameStatus, GameType } from "@modules/game/shared/model";
import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";

export type GameState = {
	gameMode: GameType;
	gameStatus: GameStatus;
};

const initialState: GameState = {
	gameMode: "single",
	gameStatus: "initial",
};

const state = createSliceState(initialState);

export const game = createSlice({
	name: "game",
	...state,
});

export const { setGameMode, setGameStatus } = game.actions;

export const { selectGameMode, selectGameStatus } = game.selectors;

export default game.reducer;
