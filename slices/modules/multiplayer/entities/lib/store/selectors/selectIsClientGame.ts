import { selectNetworkRole } from "@modules/core/network/shared/lib";
import { selectGameMode } from "@modules/game/shared/lib";
import { createSelector } from "@reduxjs/toolkit";

export const selectIsClientGame = createSelector(
	[selectNetworkRole, selectGameMode],
	(networkRole, gameMode) =>
		networkRole === "client" && gameMode === "multiplayer",
);
