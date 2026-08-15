import { selectCurrentRoute } from "@modules/core/router/shared/lib";
import { selectGameStatus } from "@modules/game/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { routes } from "@shared/config";
import { selectHostIP, selectNetworkRole } from "../network";

/**
 * Whether a dropped client socket should be brought back up.
 *
 * Every reconnect path used to bail on `gameStatus === "initial"`, but that is exactly the lobby:
 * the status is reset on entering the multiplayer screen and only leaves `"initial"` once the host
 * starts the game. A socket lost while waiting for other players was therefore unrecoverable —
 * the client sat on "connecting" until the user re-entered the invite code.
 *
 * `hostIP` is the intent signal: it is cleared on entering the screen and only set by an explicit
 * join (code, QR link or picking a discovered host).
 */
export const selectClientReconnectAllowed = createSelector(
	[selectNetworkRole, selectHostIP, selectGameStatus, selectCurrentRoute],
	(networkRole, hostIP, gameStatus, currentRoute) => {
		if (networkRole !== "client" || !hostIP) {
			return false;
		}
		if (currentRoute === routes.home) {
			return false;
		}
		if (gameStatus === "initial") {
			return currentRoute === routes.startMultiplayer;
		}
		return true;
	},
);
