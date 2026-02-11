import { goToPage } from "@modules/core/router/shared/lib";
import { setGameStatus } from "@modules/game/shared/lib";
import { routes } from "@shared/config";
import { put, takeEvery } from "redux-saga/effects";
import { startMultiplayerGame } from "./startMultiplayerGame";

function* worker() {
	yield put(setGameStatus("selecting"));
	yield put(goToPage(routes.selectInvestigators));
}

export function* startMultiplayerGameSaga() {
	yield takeEvery(startMultiplayerGame.match, worker);
}
