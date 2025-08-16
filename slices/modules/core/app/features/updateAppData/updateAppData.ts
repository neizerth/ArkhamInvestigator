import { createAction } from "@reduxjs/toolkit";

type UpdateAppDataPayload = {
	language: string;
};

export const updateAppData =
	createAction<UpdateAppDataPayload>("app/updateData");
