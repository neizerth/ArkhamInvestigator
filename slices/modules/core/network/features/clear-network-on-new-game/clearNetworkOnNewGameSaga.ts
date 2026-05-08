import { startNewGame } from "@modules/game/entities/startNewGame";
import { put, takeEvery } from "redux-saga/effects";
import { setClientRunning, setHostIP, setHostRunning } from "../../shared/lib";
import { removeAllNetworkClients } from "../../shared/lib/store/networkClient";

function* worker() {
	yield put(setClientRunning(false));
	yield put(setHostRunning(false));
	yield put(setHostIP(null));
	yield put(removeAllNetworkClients());
}

export function* clearNetworkOnNewGameSaga() {
	yield takeEvery(startNewGame.match, worker);
}
