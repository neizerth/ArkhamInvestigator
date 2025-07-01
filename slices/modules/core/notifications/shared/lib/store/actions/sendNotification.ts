import { createAction } from "@reduxjs/toolkit";
import type { NotifyOptions } from "../../notify";

export type SendNotificationPayload = NotifyOptions & {
	local?: boolean;
};

export const sendNotification =
	createAction<SendNotificationPayload>("notifications/send");
