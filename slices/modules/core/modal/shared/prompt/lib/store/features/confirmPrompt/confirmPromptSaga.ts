import { modalConfirmed } from "@modules/core/modal/shared/actions/confirm/lib";
import type { ConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/model";
import {
	type ModalActionProcessedPayload,
	selectModalValue,
} from "@modules/core/modal/shared/base/lib";
import type { PayloadAction } from "@reduxjs/toolkit";
import { put, select, takeEvery } from "redux-saga/effects";
import { promptConfirmed } from "./promptConfirmed";

type Payload = ModalActionProcessedPayload<ConfirmModalAction>;
type Action = PayloadAction<Payload>;

const filterAction = (action: unknown): action is Action => {
	if (!modalConfirmed.match(action)) {
		return false;
	}

	const { payload } = action;

	return payload.modalType === "prompt";
};

function* worker({ payload }: Action) {
	const value: ReturnType<typeof selectModalValue> =
		yield select(selectModalValue);

	if (typeof value !== "string" || !value) {
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
