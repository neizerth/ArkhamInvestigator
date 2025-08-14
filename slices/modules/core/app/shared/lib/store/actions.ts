import { createAction } from "@reduxjs/toolkit";
import type { BuildInfo } from "arkham-investigator-data";

export const initAppUI = createAction("app/initUI");

export const appIsOutdated = createAction("app/appIsOutdated");

export const appStarted = createAction("app/started");

export const appUpdated = createAction<BuildInfo>("app/started");
