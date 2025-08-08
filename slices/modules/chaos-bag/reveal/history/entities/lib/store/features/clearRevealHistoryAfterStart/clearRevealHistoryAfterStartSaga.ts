import { startChaosBagReveal } from "@modules/chaos-bag/reveal/base/entities/lib";
import { setCurrentRevealHistoryItem } from "@modules/chaos-bag/reveal/history/shared/lib";
import { put, takeEvery } from "redux-saga/effects";

function* worker() {
	yield put(setCurrentRevealHistoryItem(null));
}

export function* clearRevealHistoryAfterStartSaga() {
	yield takeEvery(startChaosBagReveal.match, worker);
}
