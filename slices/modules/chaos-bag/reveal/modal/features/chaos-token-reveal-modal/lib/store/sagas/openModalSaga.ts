import {
	continueChaosBagReveal,
	startNewChaosBagReveal,
} from "@modules/chaos-bag/reveal/base/entities/lib";
import { openChaosTokenRevealModal } from "@modules/chaos-bag/reveal/modal/entities/lib";
import { put, takeEvery } from "redux-saga/effects";

function* worker() {
	yield put(openChaosTokenRevealModal());
}

export function* openModalSaga() {
	yield takeEvery(startNewChaosBagReveal.match, worker);
	yield takeEvery(continueChaosBagReveal.match, worker);
}
