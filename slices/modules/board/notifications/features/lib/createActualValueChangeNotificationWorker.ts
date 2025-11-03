import type { BoardActualPropChangePayload } from "@modules/board/base/entities/base/model";
import type { PayloadAction } from "@reduxjs/toolkit";
import { put } from "redux-saga/effects";
import { sendInvestigatorNotification } from "../../entities/lib";

export const createActualValueChangeNotificationWorker = <
	P extends BoardActualPropChangePayload,
>(
	message: string,
) => {
	return function* changeActualValueNotificationWorker({
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
