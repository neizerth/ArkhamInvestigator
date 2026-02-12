import { withRemoteMeta } from "@modules/core/network/shared/lib";
import { createAction } from "@reduxjs/toolkit";

export const startGame = createAction(
	"game/startGame",
	withRemoteMeta({
		notify: "all",
	}),
);
