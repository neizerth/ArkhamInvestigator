import { selectGameStatus } from "@modules/game/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { selectIsClientGame } from "./selectIsClientGame";

export const selectIsClientPlaying = createSelector(
	[selectIsClientGame, selectGameStatus],
	(isClientGame, gameStatus) => isClientGame && gameStatus === "playing",
);
