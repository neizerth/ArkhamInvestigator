import { createAction } from "@reduxjs/toolkit";

export const setHostInviteCode = createAction<string>(
	"multiplayer/setHostInviteCode",
);
