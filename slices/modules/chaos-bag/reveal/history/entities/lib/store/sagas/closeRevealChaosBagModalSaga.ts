import { closeRevealChaosBagModal } from "@modules/chaos-bag/reveal/modal/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { addRevealHistoryItemFromCurrent } from "../actions";

function* worker() {
	yield put(addRevealHistoryItemFromCurrent());
}

export function* closeRevealChaosBagModalSaga() {
	yield takeEvery(closeRevealChaosBagModal.match, worker);
}
