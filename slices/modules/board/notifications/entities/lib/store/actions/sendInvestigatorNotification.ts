import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import type { DeclenseCase } from "@modules/core/i18n/shared/model";
import type { SendNotificationPayload } from "@modules/core/notifications/shared/lib";
import { createAction } from "@reduxjs/toolkit";

export type SendInvestigatorNotificationPayload = SendNotificationPayload &
	PropsWithBoardId & {
		declenseCase?: DeclenseCase;
	};

export const sendInvestigatorNotification =
	createAction<SendInvestigatorNotificationPayload>(
		"board/sendInvestigatorNotification",
	);
