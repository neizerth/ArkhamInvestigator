import { createAction } from "@reduxjs/toolkit";
import type { BuildInfo } from "arkham-investigator-data";

export const initAppUI = createAction("app/initUI");

export const appIsOutdated = createAction("app/appIsOutdated");

export const appStarted = createAction("app/started");

export type UpdateAppDataPayload = {
	language: string;
};

export const updateAppData =
	createAction<UpdateAppDataPayload>("app/updateData");

export const appInfoUpdated = createAction<BuildInfo>("app/infoUpdated");
