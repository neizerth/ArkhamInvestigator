import { updateChaosBag } from "@modules/chaos-bag/base/entities/lib";
import { startGame } from "@modules/game/entities/startGame";
import { put, takeEvery } from "redux-saga/effects";

function* worker() {
	yield put(updateChaosBag({ source: "effect" }));
}

export function* updateChaosBagOnGameStartSaga() {
	yield takeEvery(startGame.match, worker);
}
