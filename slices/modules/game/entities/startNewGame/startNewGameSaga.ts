import { goToPage } from "@modules/core/router/shared/lib";
import { routes } from "@shared/config";
import { put, takeEvery } from "redux-saga/effects";
import { startNewGame } from "./startNewGame";

function* worker() {
	yield put(goToPage(routes.selectInvestigators));
}

export function* startNewGameSaga() {
	yield takeEvery(startNewGame.match, worker);
}
