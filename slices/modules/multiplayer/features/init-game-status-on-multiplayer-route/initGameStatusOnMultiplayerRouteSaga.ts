import { routeChanged } from "@modules/core/router/shared/lib";
import { setGameStatus } from "@modules/game/shared/lib";
import { routes } from "@shared/config";
import { put, takeEvery } from "redux-saga/effects";
function* worker({ payload }: ReturnType<typeof routeChanged>) {
	if (payload !== routes.startMultiplayer) {
		return;
	}
	yield put(setGameStatus("initial"));
}

export function* initGameStatusOnMultiplayerRouteSaga() {
	yield takeEvery(routeChanged.match, worker);
}
