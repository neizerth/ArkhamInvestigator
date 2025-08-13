import { createAction } from "@reduxjs/toolkit";

export const keepAwakeChanged = createAction<boolean>(
	"device/keepAwakeChanged",
);
