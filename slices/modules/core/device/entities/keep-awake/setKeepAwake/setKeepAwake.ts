import { createAction } from "@reduxjs/toolkit";

export const setKeepAwake = createAction<boolean>("device/setKeepAwake");

export const keepAwakeChanged = createAction<boolean>(
	"device/keepAwakeChanged",
);
