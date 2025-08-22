import type {
	BoardId,
	PropsWithBoardId,
} from "@modules/board/base/shared/model";
import type { SendNotificationPayload } from "@modules/core/notifications/shared/lib";
import { createAction } from "@reduxjs/toolkit";

export type SendInvestigatorNotificationPayload = SendNotificationPayload &
	PropsWithBoardId & {
		sourceBoardId?: BoardId | null;
	};

export const sendInvestigatorNotification =
	createAction<SendInvestigatorNotificationPayload>(
		"board/sendInvestigatorNotification",
	);
