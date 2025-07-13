import { startChaosBagRevealInternal } from "@modules/chaos-bag/reveal/base/shared/lib";
import { setShowRevealModal } from "@modules/chaos-bag/reveal/modal/shared/lib";
import { put, takeEvery } from "redux-saga/effects";

function* worker() {
	yield put(setShowRevealModal(true));
}

export function* startChaosBagRevealSaga() {
	yield takeEvery(startChaosBagRevealInternal.match, worker);
}
