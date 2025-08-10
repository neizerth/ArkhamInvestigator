import { createAction } from "@reduxjs/toolkit";
import type { BuildInfo } from "arkham-investigator-data";

export type UpdateAppDataPayload = BuildInfo;
export const updateAppData =
	createAction<UpdateAppDataPayload>("app/updateData");
