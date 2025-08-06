import { modalClosed } from "@modules/core/modal/shared/base/lib";
import { put, takeEvery } from "redux-saga/effects";
import { continueChaosBagReveal } from "../../continueChaosBagReveal";
import { continueModalActionId, modalId } from "../config";

const filterAction = (action: unknown) => {
	if (!modalClosed.match(action)) {
		return false;
	}

	const { payload } = action;

	return (
		payload.modalId === modalId &&
		payload.modalAction?.id === continueModalActionId
	);
};

function* worker() {
	yield put(continueChaosBagReveal());
}

export function* handleContinueActionSaga() {
	yield takeEvery(filterAction, worker);
}
