import { appStarted } from "@modules/core/app/shared/lib";
import { stopTCPClient } from "@modules/core/network/shared/lib";
import {
	selectCurrentRoute,
	setCurrentRoute,
} from "@modules/core/router/shared/lib";
import { selectIsClientGame } from "@modules/multiplayer/entities/lib";
import { routes } from "@shared/config";
import { put, select, takeEvery } from "redux-saga/effects";

function* worker() {
	const currentRoute: ReturnType<typeof selectCurrentRoute> =
		yield select(selectCurrentRoute);
	if (currentRoute !== routes.home) {
		return;
	}
	const isClient: ReturnType<typeof selectIsClientGame> =
		yield select(selectIsClientGame);
	if (!isClient) {
		return;
	}
	yield put(stopTCPClient());
}

export function* stopTCPClientOnHomeSaga() {
	yield takeEvery(setCurrentRoute.match, worker);
	yield takeEvery(appStarted.match, worker);
}
