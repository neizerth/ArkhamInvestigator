import { createAction } from "@reduxjs/toolkit";

export type ClearLogsPayload = {
	period: "today" | "yesterday" | "all";
	notify?: boolean;
};

export const clearLogs = createAction<ClearLogsPayload>("log/clear");
