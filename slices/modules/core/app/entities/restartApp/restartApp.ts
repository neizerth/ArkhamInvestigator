import { createAction } from "@reduxjs/toolkit";

export const restartApp = createAction<void>("app/restart");
