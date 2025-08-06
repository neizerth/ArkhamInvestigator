import type { ConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/model";
import { BaseModalActionId } from "@modules/core/modal/shared/base/config";
import {
	type ModalActionProcessedPayload,
	modalClosed,
} from "@modules/core/modal/shared/base/lib";
import type { PayloadAction } from "@reduxjs/toolkit";
import { put, takeEvery } from "redux-saga/effects";
import type { StartChaosBagRevealPayload } from "../../startChaosBagReveal";
import { startNewChaosBagReveal } from "../../startNewChaosBagReveal";
import { modalId } from "../config";

const filterAction = (action: unknown) => {
	if (!modalClosed.match(action)) {
		return false;
	}

	const { payload } = action;

	return (
		payload.modalId === modalId &&
		payload.modalAction?.id === BaseModalActionId.cancel
	);
};
type ModalAction = ConfirmModalAction<StartChaosBagRevealPayload>;
type Payload = ModalActionProcessedPayload<ModalAction>;
type Action = PayloadAction<Payload>;

function* worker({ payload }: Action) {
	const { data } = payload.modalAction;

	yield put(startNewChaosBagReveal(data));
}

export function* handleStartNewActionSaga() {
	yield takeEvery(filterAction, worker);
}
