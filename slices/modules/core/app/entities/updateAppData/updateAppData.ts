import { createAction } from "@reduxjs/toolkit";

export type UpdateAppDataPayload = {
	language: string;
};

export const updateAppData =
	createAction<UpdateAppDataPayload>("app/updateData");
