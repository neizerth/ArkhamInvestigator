import { endChaosBagReveal } from "@modules/chaos-bag/reveal/base/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { addRevealHistoryItemFromCurrent } from "../actions";

function* worker() {
	yield put(addRevealHistoryItemFromCurrent());
}

export function* closeRevealChaosBagModalSaga() {
	yield takeEvery(endChaosBagReveal.match, worker);
}
