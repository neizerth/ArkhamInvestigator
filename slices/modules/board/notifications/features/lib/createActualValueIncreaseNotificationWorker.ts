import type { IncreaseBoardValuePropPayload } from "@modules/board/base/shared/lib";
import type { PayloadAction } from "@reduxjs/toolkit";
import { put } from "redux-saga/effects";
import { sendInvestigatorNotification } from "../../entities/lib";

type Payload = Omit<IncreaseBoardValuePropPayload, "type"> & {
	count?: number;
};

export const createActualValueIncreaseNotificationWorker = <P extends Payload>(
	message: string,
) => {
	return function* increaseActualValueNotificationWorker({
		payload,
	}: PayloadAction<P>) {
		const { boardId, count = 1 } = payload;

		yield put(
			sendInvestigatorNotification({
				boardId,
				message,
				data: {
					count,
				},
			}),
		);
	};
};
