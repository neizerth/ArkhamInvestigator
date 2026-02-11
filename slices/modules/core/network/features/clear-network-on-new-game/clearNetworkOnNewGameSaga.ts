import { startNewGame } from "@modules/game/entities/startNewGame";
import { put, takeEvery } from "redux-saga/effects";
import { setHostIp } from "../../shared/lib";
import { removeAllNetworkClients } from "../../shared/lib/store/networkClient";

function* worker() {
	yield put(setHostIp(null));
	yield put(removeAllNetworkClients());
}

export function* clearNetworkOnNewGameSaga() {
	yield takeEvery(startNewGame.match, worker);
}
