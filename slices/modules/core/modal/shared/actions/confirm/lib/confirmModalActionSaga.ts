import {
	type ModalActionProcessedPayload,
	modalActionProcessed,
} from "@modules/core/modal/shared/base/lib";
import type { PayloadAction } from "@reduxjs/toolkit";
import { put, takeEvery } from "redux-saga/effects";
import type { ConfirmModalAction } from "../model";
import { modalConfirmed } from "./modalConfirmed";

type Payload = ModalActionProcessedPayload<ConfirmModalAction>;
type Action = PayloadAction<Payload>;

const filterAction = (action: unknown) => {
	if (!modalActionProcessed.match(action)) {
		return false;
	}
	const { modalAction } = action.payload;

	if ("type" in modalAction) {
		return modalAction.type === "confirm";
	}

	return false;
};

function* worker({ payload }: Action) {
	yield put(modalConfirmed(payload));
}

export function* confirmModalActionSaga() {
	yield takeEvery(filterAction, worker);
}
