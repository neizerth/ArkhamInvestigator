import { isConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/lib";
import type { ConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/model";
import {
	type ModalActionProcessedPayload,
	modalActionProcessed,
	selectModalTextValue,
} from "@modules/core/modal/shared/base/lib";
import type { PayloadAction } from "@reduxjs/toolkit";
import { put, select, takeEvery } from "redux-saga/effects";
import { promptConfirmed } from "./promptConfirmed";

type Payload = ModalActionProcessedPayload<ConfirmModalAction>;
type Action = PayloadAction<Payload>;

const filterAction = (action: unknown): action is Action => {
	if (!modalActionProcessed.match(action)) {
		return false;
	}

	const { payload } = action;

	if (payload.modalType !== "prompt") {
		return false;
	}

	return isConfirmModalAction(payload.modalAction);
};

function* worker({ payload }: Action) {
	const value: ReturnType<typeof selectModalTextValue> =
		yield select(selectModalTextValue);

	if (value === null) {
		return;
	}

	yield put(
		promptConfirmed({
			...payload,
			value,
		}),
	);
}

export function* confirmPromptSaga() {
	yield takeEvery(filterAction, worker);
}
