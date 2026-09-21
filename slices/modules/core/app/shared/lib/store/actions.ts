import { createAction } from "@reduxjs/toolkit";
import type { BuildInfo } from "arkham-investigator-data";
import type { AppStateStatus } from "react-native";

export const appIsOutdated = createAction("app/appIsOutdated");

export const appStarted = createAction("app/started");

export const appLoaded = createAction("app/loaded");

export type UpdateAppDataPayload = {
	language: string;
};

export const updateAppData =
	createAction<UpdateAppDataPayload>("app/updateData");

export const appInfoUpdated = createAction<BuildInfo>("app/infoUpdated");

export const appStateChanged = createAction<AppStateStatus>("app/stateChanged");
