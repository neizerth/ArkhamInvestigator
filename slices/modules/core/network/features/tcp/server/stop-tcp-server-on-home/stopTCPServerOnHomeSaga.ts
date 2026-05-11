import {
	selectNetworkRole,
	stopTCPServer,
} from "@modules/core/network/shared/lib";
import {
	selectCurrentRoute,
	setCurrentRoute,
} from "@modules/core/router/shared/lib";
import { routes } from "@shared/config";
import { put, select, takeEvery } from "redux-saga/effects";

function* worker() {
	const currentRoute: ReturnType<typeof selectCurrentRoute> =
		yield select(selectCurrentRoute);
	if (currentRoute !== routes.home) {
		return;
	}

	const networkRole: ReturnType<typeof selectNetworkRole> =
		yield select(selectNetworkRole);

	// LAN server follows `networkRole`. `gameMode` may still be `"single"` if multiplayer was opened without `startNewGame` (deep link, restore, etc.).
	if (networkRole !== "host") {
		return;
	}
	yield put(stopTCPServer());
}

export function* stopTCPServerOnHomeSaga() {
	yield takeEvery(setCurrentRoute.match, worker);
}
