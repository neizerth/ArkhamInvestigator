import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";
import type { NotifyOptions } from "../../../notify";

export type SendNotificationPayload = NotifyOptions &
	Partial<PropsWithBoardId> & {
		local?: boolean;
	};

export const sendNotification =
	createAction<SendNotificationPayload>("notifications/send");
