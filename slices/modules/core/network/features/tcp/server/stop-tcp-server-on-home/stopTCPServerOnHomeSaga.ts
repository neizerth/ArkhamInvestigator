import { appStarted } from "@modules/core/app/shared/lib";
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
	const isHostGmae: ReturnType<typeof selectIsHostGame> =
		yield select(selectIsHostGame);
	if (!isHostGmae) {
		return;
	}
	yield put(stopTCPServer({ name: null }));
}

export function* stopTCPServerOnHomeSaga() {
	yield takeEvery(setCurrentRoute.match, worker);
	yield takeEvery(appStarted.match, worker);
}
