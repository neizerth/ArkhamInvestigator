import { createAction } from "@reduxjs/toolkit";

export const initAppUI = createAction("app/initUI");

export const appIsOutdated = createAction("app/appIsOutdated");

export const appStarted = createAction("app/started");
