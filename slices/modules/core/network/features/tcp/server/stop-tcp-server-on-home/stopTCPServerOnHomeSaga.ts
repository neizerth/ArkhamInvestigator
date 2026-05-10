import { stopTCPServer } from "@modules/core/network/shared/lib";
import {
	selectCurrentRoute,
	setCurrentRoute,
} from "@modules/core/router/shared/lib";
import { selectIsHostGame } from "@modules/multiplayer/entities/lib";
import { routes } from "@shared/config";
import { put, select, takeEvery } from "redux-saga/effects";

function* worker() {
	const currentRoute: ReturnType<typeof selectCurrentRoute> =
		yield select(selectCurrentRoute);
	if (currentRoute !== routes.home) {
		return;
	}

	const isHostGame: ReturnType<typeof selectIsHostGame> =
		yield select(selectIsHostGame);
	if (!isHostGame) {
		return;
	}
	yield put(stopTCPServer());
}

export function* stopTCPServerOnHomeSaga() {
	yield takeEvery(setCurrentRoute.match, worker);
}
