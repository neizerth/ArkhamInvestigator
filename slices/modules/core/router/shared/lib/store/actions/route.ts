import { createAction } from "@reduxjs/toolkit";

export const routeChanged = createAction<string>("router/routeChanged");
