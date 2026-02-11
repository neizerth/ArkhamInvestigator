import { withRemoteMeta } from "@modules/core/network/shared/lib";
import { createAction } from "@reduxjs/toolkit";

export const createMultiplayerGame = createAction(
	"multiplayer/createMultiplayerGame",
	withRemoteMeta({
		notify: "all",
	}),
);
