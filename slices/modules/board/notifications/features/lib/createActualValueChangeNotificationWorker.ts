import type { BoardActualPropChangePayload } from "@modules/board/base/entities/base/model";
import { i18next } from "@modules/core/i18n/shared/config";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { TOptions } from "i18next";
import { put } from "redux-saga/effects";
import { sendInvestigatorNotification } from "../../entities/lib";

type Options = {
	message: string;
	selfMessage?: string;
} & (
	| {
			type?: "common";
	  }
	| {
			type: "unit";
			unitI18nKey: string;
	  }
);

export const createActualValueChangeNotificationWorker = <
	P extends BoardActualPropChangePayload,
>(
	options: Options,
) => {
	return function* changeActualValueNotificationWorker({
		payload,
	}: PayloadAction<P>) {
		const { boardId, value = 1, sourceBoardId } = payload;

		if (value === 0) {
			return;
		}
		const isSelf = sourceBoardId === boardId;
		const selfMessage = options.selfMessage ?? options.message;
		const message = isSelf ? selfMessage : options.message;

		const data = getNotificationData({
			options,
			payload,
		});

		yield put(
			sendInvestigatorNotification({
				boardId,
				message,
				data,
				...(isSelf ? {} : { sourceBoardId }),
			}),
		);
	};
};

const getNotificationData = <P extends BoardActualPropChangePayload>({
	options,
	payload,
}: {
	options: Options;
	payload: P;
}): TOptions => {
	const count = payload.value ?? 1;
	if (options.type === "unit") {
		const value = i18next.t(options.unitI18nKey, {
			count,
		});

		console.log("options", options);

		return {
			value,
		};
	}

	return {
		count,
	};
};
