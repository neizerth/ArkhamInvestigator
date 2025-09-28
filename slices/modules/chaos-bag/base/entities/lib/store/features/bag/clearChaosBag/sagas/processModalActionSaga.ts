import { createConfirmModalFilter } from "@modules/core/modal/shared/actions/confirm/lib";
import { put, takeEvery } from "redux-saga/effects";

import { clearChaosBagInternal } from "@modules/chaos-bag/base/shared/lib";
import { modalActionId, modalId } from "../config";

const filterAction = createConfirmModalFilter({
	modalId,
	modalActionId,
});

function* worker() {
	yield put(clearChaosBagInternal());
}

export function* processModalActionSaga() {
	yield takeEvery(filterAction, worker);
}
