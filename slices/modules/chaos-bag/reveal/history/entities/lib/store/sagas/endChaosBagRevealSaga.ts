import { endChaosBagReveal } from "@modules/chaos-bag/reveal/base/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { addRevealHistoryItemFromCurrent } from "../actions";

function* worker() {
	yield put(addRevealHistoryItemFromCurrent());
}

export function* endChaosBagRevealSaga() {
	yield takeEvery(endChaosBagReveal.match, worker);
}
