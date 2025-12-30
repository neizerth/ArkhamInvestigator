import { goToPage } from "@modules/core/router/shared/lib";
import { routes } from "@shared/config";
import { put, takeEvery } from "redux-saga/effects";
import { startGame } from "./startGame";

function* worker() {
	yield put(
		goToPage({
			href: routes.board,
			replace: true,
		}),
	);
}

export function* startGameSaga() {
	yield takeEvery(startGame.match, worker);
}
