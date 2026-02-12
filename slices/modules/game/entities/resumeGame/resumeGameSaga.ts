import { goToPage } from "@modules/core/router/shared/lib";
import { routes } from "@shared/config";
import { put, takeEvery } from "redux-saga/effects";
import { resumeGame } from "./resumeGame";

function* worker() {
	yield put(goToPage(routes.board));
}

export function* resumeGameSaga() {
	yield takeEvery(resumeGame.match, worker);
}
