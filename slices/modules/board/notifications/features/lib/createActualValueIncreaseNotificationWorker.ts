import type { PropIncreasePayload } from "@modules/board/base/entities/base/model";
import type { PayloadAction } from "@reduxjs/toolkit";
import { put } from "redux-saga/effects";
import { sendInvestigatorNotification } from "../../entities/lib";

export const createActualValueIncreaseNotificationWorker = <
	P extends PropIncreasePayload,
>(
	message: string,
) => {
	return function* increaseActualValueNotificationWorker({
		payload,
	}: PayloadAction<P>) {
		const { boardId, value = 1 } = payload;

		yield put(
			sendInvestigatorNotification({
				boardId,
				message,
				data: {
					count: value,
				},
			}),
		);
	};
};
