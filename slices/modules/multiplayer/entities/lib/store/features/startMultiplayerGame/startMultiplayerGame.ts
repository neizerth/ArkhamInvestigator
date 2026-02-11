import { withRemoteMeta } from "@modules/core/network/shared/lib";
import { createAction } from "@reduxjs/toolkit";

export const startMultiplayerGame = createAction(
	"multiplayer/startGame",
	withRemoteMeta({
		notify: "all",
	}),
);
