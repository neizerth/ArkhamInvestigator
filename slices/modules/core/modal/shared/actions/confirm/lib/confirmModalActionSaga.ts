import {
	type ModalActionProcessedPayload,
	createModalActionFilter,
} from "@modules/core/modal/shared/base/lib";
import type { PayloadAction } from "@reduxjs/toolkit";
import { put, takeEvery } from "redux-saga/effects";
import { confirmModalActionId } from "../config";
import type { ConfirmModalAction } from "../model";
import { modalConfirmed } from "./modalConfirmed";

type Payload = ModalActionProcessedPayload<ConfirmModalAction>;
type Action = PayloadAction<Payload>;

const filterAction = createModalActionFilter({
	ids: [confirmModalActionId],
});

function* worker({ payload }: Action) {
	yield put(modalConfirmed(payload));
}

export function* confirmModalActionSaga() {
	yield takeEvery(filterAction, worker);
}
