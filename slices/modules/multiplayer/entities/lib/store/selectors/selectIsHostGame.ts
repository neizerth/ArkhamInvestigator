import { selectNetworkRole } from "@modules/core/network/shared/lib";
import { selectGameMode } from "@modules/game/shared/lib";
import { createSelector } from "@reduxjs/toolkit";

export const selectIsHostGame = createSelector(
	[selectNetworkRole, selectGameMode],
	(networkRole, gameMode) =>
		networkRole === "host" && gameMode === "multiplayer",
);
