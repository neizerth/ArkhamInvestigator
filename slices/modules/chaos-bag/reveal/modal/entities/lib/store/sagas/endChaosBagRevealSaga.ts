import { endChaosBagReveal } from "@modules/chaos-bag/reveal/base/shared/lib";
import { setShowRevealModal } from "@modules/chaos-bag/reveal/modal/shared/lib";
import { put, takeEvery } from "redux-saga/effects";

function* worker() {
	yield put(setShowRevealModal(false));
}

export function* endChaosBagRevealSaga() {
	yield takeEvery(endChaosBagReveal.match, worker);
}
