import { closeRevealChaosBagModal } from "@modules/chaos-bag/base/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { addRevealHistoryItemFromCurrent } from "../actions";

function* worker() {
	yield put(addRevealHistoryItemFromCurrent());
}

export function* closeRevealChaosTokenModalSaga() {
	yield takeEvery(closeRevealChaosBagModal.match, worker);
}
