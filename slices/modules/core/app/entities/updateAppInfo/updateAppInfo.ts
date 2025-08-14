import { createAction } from "@reduxjs/toolkit";
import type { BuildInfo } from "arkham-investigator-data";

export type UpdateAppInfoPayload = BuildInfo;
export const updateAppInfo =
	createAction<UpdateAppInfoPayload>("app/updateInfo");
